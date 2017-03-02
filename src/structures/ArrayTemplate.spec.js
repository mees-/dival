// @flow
import test from 'ava'

import ArrayTemplate from './ArrayTemplate'
import Field from './Field'

const simplePlain = [{
  type: 'string'
}]

test('creates single-element template', () => {
  // it shouldn't fail on creation
  // eslint-disable-next-line no-new
  new ArrayTemplate(simplePlain)
})

test('creates field', t => {
  const template = new ArrayTemplate(simplePlain)
  t.true(template.field instanceof Field)
})

test('throws on multiple-element array', t => {
  t.throws(() => {
    // eslint-disable-next-line no-new
    new ArrayTemplate([{}, {}, {}])
  })
})

test('passes single-element, correct data', t => {
  const template = new ArrayTemplate(simplePlain)
  t.true(template.test(['str']))
})

test('does not pass single-element incorrect data', t => {
  const template = new ArrayTemplate(simplePlain)
  t.false(template.test([1]))
})

test('passes multiple-element correct data', t => {
  const template = new ArrayTemplate(simplePlain)
  t.true(template.test(['str1', 'str2', 'str3']))
})
