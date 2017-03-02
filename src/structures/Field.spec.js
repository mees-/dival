// @flow
import test from 'ava'

import Field from './Field'

test('attaches rules', t => {
  const rules = new Map([
    ['test', 'rule']
  ])
  const field = new Field({}, rules)
  t.is(field.rules, rules)
})

test('runs all tests', t => {
  let checks = [1, 2, 3]
  class Rule {
    constructor(setting) {
      this.setting = setting
    }
    test() {
      checks = checks.filter(e => e !== this.setting)

      return true
    }
  }
  const rules = new Map([
    ['one', Rule],
    ['two', Rule],
    ['three', Rule]
  ])
  const field = new Field({
    one: 1,
    two: 2,
    three: 3
  }, rules)

  field.test({
    one: null,
    two: null,
    three: null
  })

  t.is(checks.length, 0)
})

test('exits after first fail', t => {
  let isFirst = true
  class Rule {
    test() {
      if (!isFirst) {
        t.fail(
        `this rule shouldn't have been checked because \
the one before this one failed`
        )
      }
      isFirst = false

      return false
    }
  }
  const rules = new Map([
    ['one', Rule],
    ['two', Rule]
  ])
  const field = new Field({
    one: null,
    two: null
  }, rules)

  field.test()
})
