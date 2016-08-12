const types = require('./types');

module.exports = function validate(template, data, testData=data, templatePath='') {
  if (!types.template(template)) {
    let errorMsg = 'template is not of type Template';
    throw new Error(errorMsg);
  }
  if (template.templateType === 'object') {
    //test data type against template type
    if (!types.object(testData)) {
      console.dir(template,{showHidden:true,colors:true});
      let errorMsg = 'data type did not match template type:' + template.templateType;
      throw new Error(errorMsg);
    }

    for (let fieldName in template.fields) {
      let field = template.fields[fieldName];

      for (let rule in field) {
        if (field[rule] === undefined) {
          continue;
        }
        let outcome = template.rules[rule].apply(field[rule], testData[fieldName],{types:template.types, fullData:data, template:template.fields, validate, path:`${templatePath}${fieldName}.${rule}`});

        if (outcome === false) {
          console.log(`${fieldName} ${rule}`);
          return outcome;
        }
      }
    }
  } else if (template.templateType === 'array') {
    //test data type against template type
    if (!types.array(testData)) {
      let errorMsg = 'data type did not match template type:' + template.templateType;
      throw new Error(errorMsg);
    }

    let field = template.fields[0];
    for (let element of testData) {
      for (let rule in field) {
        if (field[rule] === undefined) {
          continue;
        }
        let outcome = template.rules[rule].apply(field[rule], element, {types:template.types, fullData:data, template:template.fields, validate
        });

        if (outcome === false) {
          console.log(`${fieldName} ${rule}`);
          return outcome;
        }
      }
    }

  } else {
    let errorMsg = 'template does not have a valid templateType';
    throw new Error(errorMsg);
  }

  //validation passed
  return true;

}
