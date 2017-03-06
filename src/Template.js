// @flow
import type { RuleMap, plainTemplate } from './types.flow.js'

import ArrayTemplate from './structures/ArrayTemplate'
import ObjectTemplate from './structures/ObjectTemplate'

export default class Template {
  template: ArrayTemplate | ObjectTemplate

  constructor(plain: plainTemplate, customRules: RuleMap = new Map()) {
    if (Array.isArray(plain)) {
      this.template = new ArrayTemplate(plain, customRules)
    } else {
      this.template = new ObjectTemplate(plain, customRules)
    }
  }
  test(data: any) {
    return this.template.test(data)
  }
}
