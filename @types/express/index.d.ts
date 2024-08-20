import { Express } from "express-serve-static-core";

interface TokenData {
  userId: string;
  iat: string;
}

declare module "express-serve-static-core" {
  interface Request {
    tokenData: TokenData;
  }
}