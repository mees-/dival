// @flow
import test from 'ava'

import type from './type'

test('creates rule', () => {
  // eslint-disable-next-line no-new
  new type('string')
})

const typeTests = new Map([
  ['string', 'string'],
  ['boolean', true],
  ['object', {}],
  ['array', []],
  ['number', 1],
  ['symbol', Symbol('')],
  ['null', null],
  ['date', new Date()],
  ['error', new Error('')],
  ['regexp', new RegExp('')],
  // eslint-disable-next-line no-empty-function
  ['function', () => {}],
  // eslint-disable-next-line no-empty-function
  ['promise', new Promise(() => {})]
])

const testType = (t, id) => {
  const rule = new type(id)
  for (const [typeId, value] of typeTests) {
    if (typeId === id) {
      t.true(rule.test({ data: value }))
    } else {
      t.false(rule.test({ data: value }))
    }
  }
}

test('string type', t => {
  testType(t, 'string')
})

test('boolean type', t => {
  testType(t, 'boolean')
})

test('object type', t => {
  testType(t, 'object')
})

test('array type', t => {
  testType(t, 'array')
})

test('number type', t => {
  testType(t, 'number')
})

test('symbol type', t => {
  testType(t, 'symbol')
})

test('null type', t => {
  testType(t, 'null')
})

test('date type', t => {
  testType(t, 'date')
})

test('error type', t => {
  testType(t, 'error')
})

test('regexp type', t => {
  testType(t, 'regexp')
})

test('function type', t => {
  testType(t, 'function')
})

test('promise type', t => {
  testType(t, 'promise')
})

test('always passes undefined', t => {
  for (const [typeId] of typeTests) {
    const rule = new type(typeId)
    // eslint-disable-next-line no-undefined
    t.true(rule.test({ data: undefined }))
  }
})
