import { SignJWT, jwtVerify } from 'jose';

const jwtSecret = process.env.JWT_SECRET_KEY;

export const signJWT = async (payload: { sub: string }, options: { exp: string }) => {
  const secret = new TextEncoder().encode(jwtSecret);
  const alg = 'HS256';
  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime(options.exp)
    .setIssuedAt()
    .setSubject(payload.sub)
    .sign(secret);
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (await jwtVerify(token, new TextEncoder().encode(jwtSecret))).payload as T;
  } catch (error) {
    throw new Error('Your token is invalid.');
  }
};
