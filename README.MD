# Dival
Dival is a small, pluggable and lightweight data validator.

## Usage
To validate data with dival you need to create a template first (see api)  
after you have created a template, simply pass it and the data to `dival.validate`

## template format
example template for a person's data:  
```js
{
  name:{type:'string', required:true},
  age:{type:'number', required:true},
  familyMembers:{
    type:'array',
    child:[{
      name:{type:'string'},
      age:{type:'number'}
    }]
  },
  inventory:{
    type:'object',
    child:{
      drinks:{
        type:'object',
        child:{
          waterAmout:{type:'number'}
        }
      }
    }
  },
  heldDrinks:{
    type:'array',
    depends:'inventory.drinks',
    minLength:2,
    child:[{
      type:'string'
    }]
  }
}
```
In this template, `name`,`age`, `inventory.child.drinks` etc. are fields and `type`, `child`, `depends`, etc. are rules  
so a template consists of fields and fields consist of rules  
the names of the fields are the same as the names of the properties in the data

### array templates
a template can be an array but the array can only contan one element, that element should be the field used to validate all the elements in the data.  
example:
```js
[{
  type:'object',
  child:{
    name:{type:'string'},
    location:{type:'string'}
  }
}]
```

## rules
there are several rules included in the standard library
- `type`:`string (type)` this rule tests if the data matches the type. available types are in the types section below
- `required`:`boolean` if `true` this rule will check if the data exists and invalidate the data if the data piece doesn't exist. default value is `false`
- `depends`:`string` this rule is like required but instead of a boolean this rule checks wether the dependant exists, if it does the field which contains `depends` is required. for an example look above in the example template.
- `value`:`any` this rule matches the data against the value of the rule and if they aren't exactly the same it will invalidate the data
- `maxLength`:`number` this rule checks the data's `.length` property and if that is bigger than the rule's value it wil invalidate the data. if the data doesn't have a `.length` property this rule is not applied
- `minLength`:`number` this rule behaves the same as maxLength except it will invalidate the template if the length is smaller than the rule's value
- `child`:`object or array` this rule is used to validate nested data, the value of this rule will be treated as a full template and will be validated

## types
the `type` rule has some possible types, you can also add your own.  
types included by default are:
- `string`
- `object`
- `array`
- `number`
- `function`
- `boolean`
- `date`
- `field`
- `template`

the last two can be used to check wether an object is a field in a dival template or a dival template itself.

### custom types
custom types are functions of the form:
```js
function customType(value) {
  //if value matches type
  return true;
  //if value doesn't match type
  return false;
}
```

custom types can be added to a template in the `settings.types` object.  
the key in `settings.types` is the string for the rule value.
## custom rules
custom rules are like custom types but a bit more complicated.  
custom rules are objects with two methods: `validate` and `apply`  
#### `customRule.validate`
this is a function that is used to determine wether the template is valid(/good) template.  
an example is `rules.minLength.validate`:
```js
validate(value, settings) {
  //all .minLength rules must be a number

  if (!settings.types.number(value)) {
    return {
      passed:false,
      reason:'minLength is not a number'
    }
  }

  //minLength cannot be bigger than maxLength if maxLength is set
      if (settings.types.number(settings.field.maxLength)) { //if it is set (and a number)
        if (value > settigns.field.maxLength) {
          return {
            passed:false,
            reason:'minlength is bigger than maxlength'
          }
        }
      }

  //passed
  return {passed:true}
```

the `validate` function takes two arguments: `value` and `settings`.  
the `value` is the value for the rule, so in `{type'string'}` the function `type.validate()` gets passed `'sting'` as `value`

the `settings` object has some usefull settings:
- `field` the field object that containts the rule
- `types` the available types in the template, this also contains custom types if they are set
- `rules` the available rules in the template, this also contains custom rules if they are set
- `class` this object contains references to the `Field` class and the `Template` class
- `template` the user-written template object
- `path` the path to this rule in the template, this is the same format as used in the `depends` rule

#### `rule.apply`
this is a function that is called to apply the rule to the data  
an example is `rules.minLength.apply`:
```js
function(ruleValue, data, settings) {
  //if the data isn't set this rule isn't applied
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
```
this function takes three agruments, `ruleValue`, `data`, `settings`
- `ruleValue` is the value for the rule in the template
- `data` is the value for the data (not the entire data just the data that is validated by the current field)
- `settings` is an object containing the following:
  * `types` the types defined in the template
  * `rules` the rules defined in the template
  * `fullData` the full data object
  * `template` an object containing the fields in the template
  * `path` a path to the current rule in the same format as the `depends` rule
  * `validate` a reference to the `dival.validate` function

## api
### `new dival.Template(template, settings)`
`template` is an object that consists of fields and rules (see above for more explaination)  
`settings` is an object with the following options:
- `types` an object with custom types
- `rules` an object with custom rules

### `dival.validate(tempalte, data)`
this function takes the template created with `new dival.Template` and the data object, it will return `true` or `false` depending on wether the data conforms to the template
