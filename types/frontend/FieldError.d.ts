export interface IFieldError {
  field?:
    | "email"
    | "username"
    | "password"
    | "isRememberMe"
    | "passwordVerify"
    | undefined;
  message?: string;
  rule?: string;
}
