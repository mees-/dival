// @flow
import test from 'ava'

import ArrayTemplate from './ArrayTemplate'
import Field from './Field'

const simplePlain = [{
  type: 'string'
}]

test('doesn\'t fail on creation', () => {
  // it shouldn't fail on creation
  // eslint-disable-next-line no-new
  new ArrayTemplate(simplePlain)
})

test('should create field', t => {
  const template = new ArrayTemplate(simplePlain)
  t.true(template.field instanceof Field)
})

test('should throw on multiple-element array', t => {
  t.throws(() => {
    // eslint-disable-next-line no-new
    new ArrayTemplate([{}, {}, {}])
  })
})

