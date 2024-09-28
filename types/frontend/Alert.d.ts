export interface IAlert {
  type?: "error" | "success" | "info" | "warning" | undefined;
  title?: string;
  text?: string;
  closable?: boolean;
  timestamp: number;
}
