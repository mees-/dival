// @flow
export default class Field {
  rules: Object
  tests: Array<Function>
  constructor(plain: Object, rules: Object) {
    this.rules = rules
    this.tests = []

    for (const key of Object.keys(plain)) {
      if (!(key in rules)) {
        throw Error(`Rule ${ key } is unknown`)
      }
      this.tests.push(data => this.rules[key].test(data))
    }
  }

  test(data: mixed) {
    for (const test of this.tests) {
      if (!test(data)) {
        return false
      }
    }

    return true
  }
}
