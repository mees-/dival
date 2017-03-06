// @flow
import type Template from '../Template'

export default class Child {
  id: string
  setting: Template

  static id = 'child'
  id = 'child'

  constructor(setting: Template) {
    this.setting = setting
  }

  test(data: mixed) {
    return this.setting.test(data)
  }
}
