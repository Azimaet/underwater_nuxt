export interface IFieldError {
  field?: "email" | "username" | "password" | "isRememberMe" | undefined;
  message?: string;
  rule?: string;
}
