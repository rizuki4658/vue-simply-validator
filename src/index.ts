import { reactive, onMounted } from 'vue-demi';
import { Validations, State, $ErrorG, $Errors } from './types';

function SimplyValidate(validations: Validations, state: State) {
  const keys = Object.keys(state);
  const $invalid = false;
  const $error = false;
  const $dirty = false;
  const $errors: $Errors = [];

  let results: any = reactive({
    $dirty,
    $error,
    $errors,
    $invalid,
    $touch,
    $reset,
  });

  keys.forEach((key) => {
    const test = reactive({
      [key]: {
        $dirty,
        $error,
        $errors,
        $invalid,
        $path: key,
      },
    });
    results = { ...results, ...test };
  });
  function valueSetter(isValid: boolean = false, messages: string | [] | null = null, path: string = '') {
    if (isValid) {
      results[path].$dirty = true;
      results[path].$error = true;
      results[path].$errors = messages ? messages : [];
      results[path].$invalid = true;

      results.$dirty = true;
      results.$error = true;
      results.$invalid = true;
      return;
    }
    results.$errors = results.$errors.filter((item: $ErrorG) => item.model !== path);
    results[path].$dirty = false;
    results[path].$error = false;
    results[path].$errors = [];
    results[path].$invalid = false;
  }
  function isFunction(val: string) {
    return typeof val === 'function';
  }
  function nestedValidators(path: string, value: any = null) {
    const validators = Object.keys(validations[path]);
    let invalid: boolean = false;
    const messages: any = [];
    validators.forEach((validator) => {
      const length = validations[path][validator].$params.min || validations[path][validator].$params.max;
      if (value) {
        invalid = validations[path][validator].$validator(value, length);
      } else invalid = validations[path][validator].$validator(state[path], length);

      if (invalid) {
        if (validations[path].message) {
          messages.push(validations[path].message);
        } else {
          if (isFunction(validations[path][validator].$message)) {
            messages.push(validations[path][validator].$message());
          } else {
            messages.push(validations[path][validator].$message);
          }
        }
        results.$errors.push({
          model: path,
          message: validations[path][validator].$message,
        });
      }
    });
    return {
      invalid,
      messages,
    };
  }
  function $touch() {
    keys.forEach((key) => {
      const { invalid, messages } = nestedValidators(key);
      if (invalid) {
        valueSetter(invalid, messages, key);
      }
    });
    return results;
  }
  function $reset() {
    keys.forEach((key) => {
      results[key].$dirty = false;
      results[key].$error = false;
      results[key].$errors = [];
      results[key].$invalid = false;

      results.$dirty = false;
      results.$error = false;
      results.$invalid = false;
    });
    return results;
  }
  function singleCheck(value: any, path: string) {
    const { invalid, messages } = nestedValidators(path, value);
    valueSetter(invalid, messages, path);
  }
  function changeInput(e: any) {
    if (!results.$error) return;
    singleCheck(e.target.value, e.target.name);
  }
  onMounted(() => {
    keys.forEach((key) => {
      const test = document.getElementsByName(key)[0];
      test.addEventListener('blur', changeInput);
    });
  });
  return results;
}

export default SimplyValidate;
