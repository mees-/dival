// @flow
import test from 'ava'

import required from './required'

test('creates rule', () => {
  // eslint-disable-next-line no-new
  new required(false)
})

test('contains id statically and on instance', t => {
  t.is(required.id, 'required')
  const rule = new required(true)
  t.is(rule.id, 'required')
})

test('passes required, non-null/undef', t => {
  const rule = new required(true)
  t.true(rule.test('string'))
  t.true(rule.test(123))
  t.true(rule.test(false))
})

test('does not pass required null/undef', t => {
  const rule = new required(true)
  t.false(rule.test(null))
  // eslint-disable-next-line no-undefined
  t.false(rule.test(undefined))
})

test('passes unrequired non-null/undef', t => {
  const rule = new required(false)
  t.true(rule.test('string'))
  t.true(rule.test(123))
  t.true(rule.test(true))
})

test('passes unrequired null/undef', t => {
  const rule = new required(false)
  t.true(rule.test(null))
  // eslint-disable-next-line no-undefined
  t.true(rule.test(undefined))
})
