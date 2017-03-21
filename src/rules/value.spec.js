import test from 'ava'

import Value from './value'

test('creates', () => {
  new Value([]) // eslint-disable-line no-new
})

test('sets setting', t => {
  const value = new Value(['string'])
  t.deepEqual(value.setting, ['string'])
})

test('converts setting to array', t => {
  const value = new Value('string')
  t.true(Array.isArray(value.setting))
})

test('passes correct', t => {
  const value = new Value(['string'])
  t.true(value.test('string'))
})

test('does not pass incorrect', t => {
  const value = new Value(['string'])
  t.false(value.test('not that'))
})
