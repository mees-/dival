// @flow
import defaultRules from '../rules/index'
import type { RuleMap } from '../types.flow.js'

export default class TemplateBase {
  rules: RuleMap
  constructor(customRules: RuleMap | Object = new Map()) {
    this.rules = defaultRules
    let processedCustomRules
    if (customRules instanceof Map) {
      processedCustomRules = customRules
    } else {
      processedCustomRules = new Map()
      for (const key of Object.keys(customRules)) {
        processedCustomRules.set(key, customRules[key])
      }
    }
    for (const [ruleId, Rule] of processedCustomRules) {
      this.rules.set(ruleId, Rule)
    }
  }
}
