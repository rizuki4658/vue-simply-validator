const Checker = {
  required(value: any) {
    if (!value) return true;

    if (typeof value === 'string') {
      value = value.trim();
    }
    return value.length ? false : true;
  },
  length(value: any) {
    if (Array.isArray(value)) return value.length;

    if (typeof value === 'object') {
      return Object.keys(value).length;
    }
    return String(value).length;
  },
  regex(value: any, rules: any) {
    if (!value) return true;
    const result = rules.test(value);
    if (!result) return true;
    return false;
  },
  minLength(value: any, length: number) {
    if (!value) return true;
    if (this.length(value) < length - 1) return true;
    return false;
  },
  maxLength(value: any, length: number) {
    if (!value) return true;
    if (this.length(value) > length - 1) return true;
    return false;
  },
  alphabet(value: string) {
    return this.regex(value, /^[a-zA-Z]*$/);
  },
  number(value: number) {
    return this.regex(value, /^\d*(\.\d+)?$/);
  },
  alphaNumeric(value: string) {
    return this.regex(value, /^[a-zA-Z0-9]*$/);
  },
  email(value: string) {
    const emailRegex =
      /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
    const result = emailRegex.test(value);
    if (!result) return true;
    return false;
  },
};

export default Checker;
