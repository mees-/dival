const Result = require('./Result');
module.exports = rules = {
  'type':{
    defaultSetting:undefined,
    validate(value, settings) {
      //all .type rules must be a string
      if (!settings.types.string(value)) {
        return new Result(false, 'type was not a string');
      }

      //all types §§must be defined
      if (!(value in settings.types)) {
        return new Result(false, 'type is not defined');
      }

      //all object types must have a child property with an object as value
      if (value === 'object' && !settings.types.object(settings.field.child)) {
        return new Result(false, 'type is object but child ins\'t object');
      }

      //all array types must have a child property with an array as value
      if (value === 'array' && !settings.types.array(settings.field.child)) {
        return new Result(false, 'type was array but child isn\'t array');
      }

      //passed
      return new Result(true);
    },

    apply(ruleValue, data, settings) {
      if (!data) {
        return true;
      }
      return settings.types[ruleValue](data);
    }
   },
  'required':{
    defaultSetting:false,
    validate(value, settings) {
      //all .required rules must be a boolean
      if (!settings.types.boolean(value)) {
        return new Result(false, 'required is not a boolean');
      }

      //passed
      return new Result(true);
    },

    apply(ruleValue, data, settings) {
      if (!data && ruleValue) {
        return false;
      } else {
        return true;
      }
    }
  },
  'depends':{
    defaultSetting:undefined,
    validate(value, settings) {
      //all .depends rules must be a string
      if (!settings.types.string(value)) {
        return new Result(false, 'depends is not a string');
      }

      //all .depends rules must depend on an existing field in the template
      //get to dependant
      let parsedDepends = value.split('.');
      let dependant = settings.template;
      for (let step of parsedDepends) {
        if ('child' in dependant && !!dependant.child) {
          dependant = dependant.child;
        }
        dependant = dependant[step];
      }

      //test if it is a field
      if (!settings.types.object(dependant)) {
        return new Result(false, 'dependant isn\'t a field');
      }

      //passed
      return new Result(true);
    },

    apply(ruleValue, data, settings) {
      //build dependant
      let parsedDepends = ruleValue.split('.');
      let dependant = settings.fullData;
      for (let step of parsedDepends) {
        if (!dependant[step]) {
          return true;
        }
        dependant = dependant[step];
      }
      if (!!dependant && !data) {
        return false;
      } else {
        return true;
      }
    }
  },
  'value':{
    defualtSetting:null,
    validate(value, settings) {
      //TODO add better validation for value
      // //all .value rules must match the (existing) rules for that field
      // for (let rule in settings.rules) {
      //   if (rule in settings.field && !!settings.field[rule] && !settings.rules[rule].apply(settings.field[rule], value, settings)) {
      //     return new Result(false, 'value did not match rule ' + rule);
      //   } else if (rule in settings.field && !!settings.field[rule]) {
      //     console.log('value passed rule ' + rule);
      //   }
      // }

      //passed
      return new Result(true);
    },

    apply(ruleValue, data, settings) {
      if (!data) {
        return true;
      }
      return ruleValue === data;
    }
  },
  'maxLength':{
    defaultSetting:undefined,
    validate(value, settings) {
      //all .maxLength rules must be a number
      if (!settings.types.number(value)) {
        return new Result(false, 'maxLength is not a number');
      }

      //maxLength cannot be smaller than minLength if minLength is set
      if (settings.types.number(settings.field.minLength)) {
        if (value < settigns.field.minLength) {
          return new Result(false, 'maxLength is bigger than minLength');
        }
      }
      //passed
      return new Result(true);
    },

    apply(ruleValue, data, settings) {
      if (!data) {
        return true;
      }
      //if data doesn't have a .length property this rule isn't applied
      if (data.length === undefined) {
        return true;
      }

      if (data.length > ruleValue) {
        return false;
      } else {
        return true;
      }
    }
  },
  'minLength':{
    defaultSetting:undefined,
    validate(value, settings) {
      //all .minLength rules must be a number

      if (!settings.types.number(value)) {
        return new Result(false, 'minLength is not a number');
      }

      //passed
      return new Result(true);
    },

    apply(ruleValue, data, settings) {
      if (!data) {
        return true;
      }
      //if data doesn't have a .length property this rule isn't applied
      if (data.length === undefined) {
        return true;
      }

      if (data.length < ruleValue) {
        return false;
      } else {
        return true;
      }
    }
  },
  'child':{
    defaultSetting:undefined,
    validate(value, settings) {
      //all .child rules must be an array or object
      if (!settings.types.array(value) && !settings.types.object(value)) {
        return new Result(false, 'child is neither an array nor an object');
      }

      //all .child rules must match optional type for that field
      if ('type' in settings.field && settings.field.type in settings.types && !settings.types[settings.field.type](value)) {
        return new Result(false, 'child did not match type for the field');
      }

      //all .child rules will be validated as a full template
      try {
        let someOtherName = new settings.class.Template(value, {types:settings.types, rules:settings.rules, path:`${settings.path}.child.`});
      } catch (e) {
        console.log('failed:',e);
        return new Result(false, e.message);
      }

      //passed
      return new Result(true);
    },

    apply(ruleValue, data, settings) {
      if (!data) {
        return true;
      }
      let outcome = settings.validate(ruleValue, settings.fullData, data, settings.path);

      return outcome;
    }
  }
}
