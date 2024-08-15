
export const DATABASE = {
  CONNECTION_STRING: process.env.POSTGRES_URL,
  USER: process.env.POSTGRES_USER,
  HOST: process.env.POSTGRES_HOST,
  DATABASE: process.env.POSTGRES_DATABASE,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  PORT: process.env.POSTGRES_PORT,
};

export const EXPRESS_PORT = parseInt(process.env.EXPRESS_PORT);

export const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);
export const BCRYPT_PEPPER = process.env.BCRYPT_Pepper;

export const JWT_SECRET = process.env.JWT_SECRET;