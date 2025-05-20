import 'express-session';

declare module 'express-session' {
  interface SessionData {
    cart?: { _id: string; number: number }[];
  }
}
