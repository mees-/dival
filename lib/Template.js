const Field = require('./Field');
const defaultTypes = require('./types');
const defaultRules = require('./rules');

module.exports = class Template {
  constructor(template, settings={types:{}, rules:{}, path:'template.'}) {
    //set isDivalTemplate so it can be tested
    Object.defineProperty(this, 'isDivalTemplate',{value:true}); //so it isnt enumerable

    //fill in the defaults
    settings.types = settings.types || {};
    settings.rules = settings.rules || {};
    settings.path = settings.path || 'template.';

    //add custom types and rules to defaults and attach them to the template
    //TODO replace this assign with a function that warnes if there are duplicates (maybe)
    this.types = Object.assign(defaultTypes, settings.types);
    this.rules = Object.assign(defaultRules, settings.rules);


    //attach type to template
    if (types.object(template)) {
      this.templateType = 'object';
    } else if (types.array(template)) {
      this.templateType = 'array';
    }

    //create fields object for storing the converted fields
    this.fields = {};

    //
    //validate template
    //
    //template must be object or array
    if (!types.object(template) && !types.array(template)) {
      let errorMsg = 'template must be an object or array';
      throw new Error(errorMsg);
    }

    //if template is array then it must only contain one element
    if (types.array(template) && template.length !== 1) {
      let errorMsg = 'if the template is an array it must only contain one element';
      throw new Error(errorMsg);
    }

    //loop through template
    for (let key in template) {
      let field = template[key];
      //convert all fields to Fields and handle validation there
      this.fields[key] = new Field(field, {
        types,
        template,
        field,
        rules,
        path:`${settings.path}${key}`,
        class:{
          Template,
          Field
        }
      });
    }

    //if the validation passes, convert all .child rules to templates
    for (let field in this.fields) {
      if ('child' in this.fields[field] && this.fields[field].child !== undefined) {
        this.fields[field].child = new Template(this.fields[field].child);
      }
    }
  }
}
