// @flow
import type { plainObjectTemplate, RuleMap } from '../types.flow.js'
import TemplateBase from './TemplateBase'
import Field from './Field'

export default class ObjectTemplate extends TemplateBase {
  fields: Map<string, Field>
  constructor(
    plain: plainObjectTemplate,
    customRules: RuleMap | Object = new Map()
  ) {
    super(customRules)

    this.fields = new Map()

    for (const k of Object.keys(plain)) {
      const [key, value] = [k, plain[k]]
      this.fields.set(key, new Field(value, this.rules))
    }
  }

  test(data: any): boolean {
    if (typeof data !== 'object') {
      return false
    }

    for (const [key, field] of this.fields) {
      if (!field.test(data[key])) {
        return false
      }
    }

    return true
  }
}
