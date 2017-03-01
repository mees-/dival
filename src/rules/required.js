// @flow
import type { Rule } from '../types.flow.js'

export default class RequiredRule {
  identifier: string
  setting: boolean
  constructor(setting: boolean) {
    (this: Rule)
    this.identifier = 'required'
    this.setting = setting
  }

  test(data: ?any): boolean {
    if (typeof data !== 'undefined') {
      return true
    } else {
      return false
    }
  }
}
