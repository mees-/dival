// @flow
export default class Required {
  identifier: string
  setting: boolean

  static identifier = 'required'
  identifier = 'required'

  constructor(setting: boolean) {
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
