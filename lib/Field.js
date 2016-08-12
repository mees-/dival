module.exports = class Field {
  constructor(rawField, settings) {
    Object.defineProperty(this, 'divalIsField', {value:true}); //so it isn't enumerable
    for (let rule in settings.rules) {
      if (rule in rawField) {
        let validationResult = settings.rules[rule].validate(rawField[rule],settings);
        if (!validationResult.passed) {
          let errorMsg = `template validation failed at ${settings.path}.${rule}, reason: ${validationResult.reason}`;
          throw new Error(errorMsg);
        }
        this[rule] = rawField[rule];
      } else {
        this[rule] = settings.rules[rule].defaultSetting;
      }
    }
  }
}
