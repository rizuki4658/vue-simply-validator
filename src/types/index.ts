export type State = any;
export type Validations = any;
export type $Dirty = boolean;
export type $Error = boolean;
export type $ErrorG = {
  model: string;
  message: string;
};
export type $Errors = $ErrorG[];
export type $Invalid = () => void;
export type $Touch = () => void;
export type $Reset = () => void;
export type Results = {
  $dirty: $Dirty;
  $error: $Error;
  $errors: $Errors;
  $invalid: $Invalid;
  $touch: $Touch;
  $reset: $Reset;
};
