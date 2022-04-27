import SimplyValidate from '../index'

import { required, email, minLength } from '../validators'

const rules =  {
  name: { required, minLength: minLength(10) },
  email: { required, email }
}

const state = {
  name: null,
  email: null
}

const validation = SimplyValidate(rules, state)

const validating = () => {
  validation.$touch()
}

test('My Validation', () => {
  expect(validating()).toBe('Okay')
})
