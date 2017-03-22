// @flow
export default class Required {
  id: string
  setting: boolean

  static id = 'required'
  id = 'required'

  constructor(setting: ?boolean) {
    if (setting === undefined) {
      throw new Error('setting cannot be undefined')
    }
    this.setting = setting
  }

  test({ data }: { data: ?mixed }): boolean {
    if (!this.setting) {
      // if something isn't required it always passes this test
      return true
    }
    if (typeof data !== 'undefined' && data !== null) {
      return true
    } else {
      return false
    }
  }
}
