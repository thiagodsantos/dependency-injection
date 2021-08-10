import { compareSync, hashSync } from "bcrypt";

const BCRYPT_SALT_ROUNDS: number = process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS) : 5

export const hash = (value: string): string => {
  return hashSync(value, BCRYPT_SALT_ROUNDS);
}

export const compare = (value: string, hash: string) => {
  return compareSync(value, hash);
}
