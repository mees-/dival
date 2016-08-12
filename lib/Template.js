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

    //add custom types and rules to defaults
    //TODO replace this assign with a function that warnes if there are duplicates (maybe)
    let types = Object.assign(defaultTypes, settings.types);
    let rules = Object.assign(defaultRules, settings.rules);

    //attach types and rules to template
    Object.defineProperty(this,'types',{value:types});
    Object.defineProperty(this,'rules',{value:rules});

    //attach type to template
    if (types.object(template)) {
      Object.defineProperty(this,'templateType',{value:'object'});
    } else if (types.array(template)) {
      Object.defineProperty(this,'templateType',{value:'array'});
    }

    //if template is array forward .field to this[0]
    if (this.templateType === 'array') {
      Object.defineProperty(this,'field',{get:function() {
        return this[0];
      }});
    }

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
      this[key] = new Field(field, {
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

    //if the validation passes convert all .child rules to templates
    for (let field in this) {
      if ('child' in this[field] && this[field].child !== undefined) {
        this[field].child = new Template(this[field].child);
      }
    }
  }
}
