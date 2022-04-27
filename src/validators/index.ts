import Checker from './checker';

export const required = {
  $validator: Checker.required,
  $message: 'This field is required',
  $params: {
    type: 'required',
  },
};

export const email = {
  $validator: Checker.email,
  $message: 'This is not a valid email address',
  $params: {
    type: 'email',
  },
};

export const minLength = (min: number) => ({
  $validator: Checker.minLength,
  $message: () => `This field should be at least ${min} character`,
  $params: {
    min,
    type: 'minLength',
  },
});

export const maxLength = (max: number) => ({
  $validator: Checker.maxLength,
  $message: () => `This field should be at least ${max} character`,
  $params: {
    max,
    type: 'maxLength',
  },
});

export const alphabet = {
  $validator: Checker.alphabet,
  $message: 'This field is required and alphabet only',
  $params: {
    type: 'alphabet',
  },
};

export const numeric = {
  $validator: Checker.number,
  $message: 'This field is required and numeric only',
  $params: {
    type: 'numeric',
  },
};

export const alphaNumeric = {
  $validator: Checker.alphaNumeric,
  $message: 'This field is required and alphanumeric only',
  $params: {
    type: 'alphaNumeric',
  },
};
