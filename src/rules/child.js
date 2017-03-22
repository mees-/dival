// @flow
import type Template from '../Template'

export default class Child {
  id: string
  setting: Template

  static id = 'child'
  id = 'child'

  constructor(setting: ?Template) {
    if (!setting) {
      throw new Error('setting cannot be undefined')
    }
    if (!setting.isDivalTemplate) {
      throw new Error('setting of child should be an instance of Template')
    }
    this.setting = setting
  }

  test({ data }: { data: ?mixed }) {
    return this.setting.test(data)
  }
}
