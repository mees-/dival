# dival
[![Build Status](https://travis-ci.org/mees-/dival.svg?branch=master)](https://travis-ci.org/mees-/dival)
> The data validation library for Node.js and the Browser

### This readme is currently incomplete
dival is a library to validate javascript data.  
The way dival works is you create a template:  
```js
import Template from 'dival'
const template = new Template({
  // fields here
})
```

This template can then be used to test wether data conforms to the template  
```js
template.test({
  // this is data
})
// returns either true or false
```

## Documentation
### What is a template?
A template is an object that has a test method, this method takes data and returns `true` if the data conforms to the template, otherwise it returns `false`  
a template can be created as a class with the `new` operator
```js
const template = new Template({
  // fields
})
```

An optional second parameter can be
given to the Template constructor, a custom rules Map, this is a [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map) with rule identifiers as map keys and the rules themselves as values, more on what rules are further down.

### What is a field?
a field is a key of a template, it is an object with rules identifiers as keys and rule settings as values, an example of a field:  
```js
const plainTemplate = {
  // fields here:
  name: { // the key of a field matches a property in the data
    type: 'string'
  },
  age: {
    type: 'number'
  }
}

const template = new Template(plainTemplate)

template.test({
  name: 'dival',
  age: 100
})
// => true

template.test({
  name: 123,
  age: 'this is a string, not a number'
})
// => false
```

### What is a rule?
A rule is a key to a field, it will check the fields corresponding value in the data. The value of a rule is called a `setting`.  
The test method on a template will only return `true` if all rules pass
There are several types of rules:
- type: checks the type of the data property
- required: ensures the property is present (not `undefined`)
- child: this rule is used to test deeper data, more on this rule below

#### The type rule
This rule is fairly straight-forward, it checks that a value is of type `x`  
> NOTE: this rule does not work like the required rule, when passed undefined it always returns `true`  

possible settings for this rule are:
- `'string'`
- `'boolean'`
- `'object'`
- `'array'`
- `'number'`
- `'symbol'`
- `'null'`
- `'date'`
- `'error'`
- `'regexp'`
- `'function'`
- `'promise'`

Note that these are all lower-case `strings`

#### the required rule
The most simple rule, takes a `boolean` as a setting and checks that a value is not undefined

# TODO:
- child rule
- custom rules
- arraytemplates
