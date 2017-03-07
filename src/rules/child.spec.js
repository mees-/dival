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

test('throws when setting is not a template', t => {
  t.throws(() => {
    // flow-ignore
    new child({}) // eslint-disable-line no-new
  })
})

test('works as rule in template with correct data', t => {
  const template = new Template({
    servers: {
      type: 'object',
      child: new Template({
        google: {
          type: 'string'
        },
        youtube: {
          type: 'string'
        }
      })
    }
  })

  t.true(template.test({
    servers: {
      google: 'google.com',
      youtube: 'youtube.com'
    }
  }))
})

test('works as rule in template with incorrect data', t => {
  const template = new Template({
    servers: {
      type: 'object',
      child: new Template({
        google: {
          type: 'string'
        },
        youtube: {
          type: 'string'
        }
      })
    }
  })

  t.false(template.test({
    servers: {
      google: 1,
      youtube: null
    }
  }))
})
