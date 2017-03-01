// @flow
import TemplateBase from './TemplateBase'
import Field from './Field'

export default class ArrayTemplate extends TemplateBase {
  field: Field
  constructor(plain: Array<Object>, customRules: Object = {}) {
    super(customRules)
    if (plain.length !== 1) {
      throw new Error('an ArrayTemplate must have exactly one element')
    }

    this.field = new Field(plain[0], this.rules)
  }

  test(data: Array<any>) {
    for (const element of data) {
      if (!this.field.test(element)) {
        return false
      }
    }

    return true
  }
}
