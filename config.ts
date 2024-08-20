export interface DatabaseConfig {
  CONNECTION_STRING: string;
  USER: string;
  HOST: string;
  DATABASE: string;
  PASSWORD: string;
  PORT: string;
}

export const DATABASE: DatabaseConfig = {
  CONNECTION_STRING: process.env.POSTGRES_URL!,
  USER: process.env.POSTGRES_USER!,
  HOST: process.env.POSTGRES_HOST!,
  DATABASE: process.env.POSTGRES_DATABASE!,
  PASSWORD: process.env.POSTGRES_PASSWORD!,
  PORT: process.env.POSTGRES_PORT!,
};

export const EXPRESS_PORT: number = parseInt(process.env.EXPRESS_PORT!);

export const BCRYPT_SALT_ROUNDS: number = parseInt(process.env.BCRYPT_SALT_ROUNDS!);
export const BCRYPT_PEPPER: string = process.env.BCRYPT_Pepper!;

export const JWT_SECRET: string = process.env.JWT_SECRET!;