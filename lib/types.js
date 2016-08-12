//these keys are used as a value for the type property for fields
module.exports = types = {
  //string
  'string':function(value) {
    return typeof value === 'string';
  },
  //object
  'object':function(value) {
    return (typeof value === 'object' && !Array.isArray(value))
  },
  //array
  'array':function(value) {
    return (Array.isArray(value));
  },
  //number
  'number':function(value) {
    return typeof value === 'number';
  },
  //function
  'function':function(value) {
    return value instanceof Function;
  },
  //boolean
  'boolean':function(value) {
    return (value === true || value === false);
  },
  //date
  'date':function(value) {
    return value instanceof Date;
  },
  //field
  'field':function(value) {
    return value.isDivalField === true;
  },
  //template
  'template':function(value) {
    return value.isDivalTemplate === true;
  }
}
