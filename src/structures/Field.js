// @flow
import type { Rule, RuleMap } from '../types.flow.js'

export default class Field {
  rules: RuleMap
  tests: Array<Rule>
  constructor(plain: Object, rules: RuleMap) {
    this.rules = rules
    this.tests = []

    for (const [ruleId, rule] of this.rules) {
      if (ruleId in plain) {
        this.tests.push(new rule(plain[ruleId]))
      }
    }
  }

  test(data: mixed) {
    for (const test of this.tests) {
      if (!test.test(data)) {
        return false
      }
    }

    return true
  }
}
