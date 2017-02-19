import test from 'ava'

import dival from './index'

import Template from './Template'
import validate from './quickValidate'

test('import', (t) => {
  t.is(dival.Template, Template)
  t.is(dival.valdiate, validate)
})
