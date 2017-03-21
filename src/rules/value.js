// @flow

export default class Value {
  setting: Array<mixed>

  static id = 'value'
  id = 'value'

  constructor(setting: ?Array<mixed> | ?any) {
    if (!setting) {
      throw new Error('setting cannot be undefined')
    }
    if (!Array.isArray(setting)) {
      this.setting = [setting]
    } else {
      this.setting = setting
    }
  }

  test(data: ?mixed) {
    for (const possibleValue of this.setting) {
      if (data === possibleValue) {
        return true
      }
    }
    return false
  }
}
