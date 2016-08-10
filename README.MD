### example template
```js
const example = {
  name:{type:'string', required:true},
  network:{
    type:'object',
    required:true,
    child:{
      ip:{type:'ip', required:false},
      location:{type:'location', depends:'network.ip'}
    }
  },
  help:{required:true, value:'mees'},
  passedNames:{
    type:'array',
    maxLength:5,
    minLength:2,
    child:[{
      type:'string',
      maxLength:10
    }]
  }
}
```

### possible tests
- type
- required
- depends
- minLength
- maxLength
- value
