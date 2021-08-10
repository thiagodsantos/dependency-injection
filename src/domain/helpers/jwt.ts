import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? 'J*z4L3V!WNy5'

export const sign = (data: unknown) => {
  return jwt.sign({ data }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN ?? '24h' });
}

export const verify = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
