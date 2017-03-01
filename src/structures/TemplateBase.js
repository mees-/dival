// @flow
import * as defaultRules from '../rules/index'
import type { RuleMap } from '../types.flow.js'

export default class TemplateBase {
  rules: RuleMap
  constructor(customRules: RuleMap) {
    this.rules = {
      ...defaultRules,
      ...customRules
    }
  }
}
