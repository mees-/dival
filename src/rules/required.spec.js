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
  t.true(rule.test({ data: 'string' }))
  t.true(rule.test({ data: 123 }))
  t.true(rule.test({ data: false }))
})

test('does not pass required null/undef', t => {
  const rule = new required(true)
  t.false(rule.test({ data: null }))
  // eslint-disable-next-line no-undefined
  t.false(rule.test({ data: undefined }))
})

test('passes unrequired non-null/undef', t => {
  const rule = new required(false)
  t.true(rule.test({ data: 'string' }))
  t.true(rule.test({ data: 123 }))
  t.true(rule.test({ data: true }))
})

test('passes unrequired null/undef', t => {
  const rule = new required(false)
  t.true(rule.test({ data: null }))
  // eslint-disable-next-line no-undefined
  t.true(rule.test({ data: undefined }))
})
