// @flow
import test from 'ava'

import ObjectTemplate from './ObjectTemplate'
import Field from './Field'

test('creates a single-key template', () => {
  // eslint-disable-next-line no-new
  new ObjectTemplate({
    name: {
      type: 'string'
    }
  })
})

test('creates a multiple-key template', () => {
  // eslint-disable-next-line no-new
  new ObjectTemplate({
    name: {
      type: 'string'
    },
    age: {
      type: 'number'
    }
  })
})

test('creates all fields', t => {
  const plain = {
    name: {
      type: 'string'
    }
  }
  let plainFields = Object.keys(plain)
  const template = new ObjectTemplate(plain)
  for (const [key] of template.fields) {
    plainFields = plainFields.filter(e => e !== key)
  }
  t.is(plainFields.length, 0)
})

test('every field is instanceof Field', t => {
  const template = new ObjectTemplate({
    name: {
      type: 'string'
    }
  })
  for (const [, field] of template.fields) {
    t.true(field instanceof Field)
  }
})

test('passes correct data', t => {
  const template = new ObjectTemplate({
    name: {
      type: 'string'
    }
  })
  t.true(template.test({ name: 'dival' }))
})

test('does not pass incorrect data', t => {
  const template = new ObjectTemplate({
    name: {
      type: 'string'
    }
  })
  t.false(template.test({ name: 0 }))
})
