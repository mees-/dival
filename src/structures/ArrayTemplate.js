// @flow
import type { RuleMap, plainArrayTemplate } from '../types.flow.js'
import TemplateBase from './TemplateBase'
import Field from './Field'

export default class ArrayTemplate extends TemplateBase {
  field: Field
  constructor(
    plain: plainArrayTemplate,
    customRules: RuleMap | Object = new Map()
  ) {
    super(customRules)

    if (plain.length !== 1) {
      throw new Error('an ArrayTemplate must have exactly one element')
    }

    this.field = new Field(plain[0], this.rules)
  }

  test(data: any): boolean {
    if (!Array.isArray(data)) {
      return false
    }
    for (const element of data) {
      const params = {
        data: element,
        parent: data,
        templateType: 'array'
      }
      if (!this.field.test(params)) {
        return false
      }
    }

    return true
  }
}
