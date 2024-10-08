export interface IFieldError {
  field?:
    | "email"
    | "username"
    | "password"
    | "isRememberMe"
    | "passwordVerify"
    | "maxDepth"
    | "totalTime"
    | "date"
    | undefined;
  message?: string;
  rule?: string;
}
