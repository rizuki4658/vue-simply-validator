# Vue Simply Validator
Vue Simply Validator is helper for validation form, this validator only work and support for vue 3.

## Feature Validation
1. Required
2. Alphabet
3. Numeric
4. Alphanumeric
5. Email

## Install
npm install vue-simply-validator

## How to use
```javascript
import SimplyValidator from 'vue-simply-validator'
import { required, email, minLength } from 'vue-simply-validator/validators'

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
```

```html
<template>
  <form @submit.prevent="validating">
    <label>Name</label>
    <input type="text" name="name" v-model="state.name"  />
    <p v-if="validation.name.$errors.length">
      <span v-for="(error, n) in validation.name.$errors" :key="n">
      {{ error }}
      </span>
    </p>
    <label>Email</label>
    <input type="email" name="email" v-model="state.email"  />
    <p v-if="validation.email.$errors.length">
      <span v-for="(error, n) in validation.email.$errors" :key="n" style="display: block;">
      {{ error }}
      </span>
    </p>
    <button type="submit">Submit</button>
    <button @click="resetForm" type="reset">Reset</button>
  </form>
</template>
```
