// @flow
import test from 'ava'

import child from './child'
import Template from '../Template'

test('creates rule', () => {
  // eslint-disable-next-line no-new
  new child(new Template({}))
})

test('contains id statically and on instance', t => {
  t.is(child.id, 'child')
  const rule = new child(new Template({}))
  t.is(rule.id, 'child')
})

test('creates template inside rule', t => {
  const plain = {
    name: {
      type: 'string'
    }
  }
  const template = new Template(plain)
  const rule = new child(template)
  t.deepEqual(rule.setting, template)
})

test('contains an instance of a Template', t => {
  const rule = new child(new Template({}))
  t.true(rule.setting instanceof Template)
})
