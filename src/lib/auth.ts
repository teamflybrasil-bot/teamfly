import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "tf_session";
const MAX_AGE = 60 * 60 * 8; // 8 horas

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET não configurado no .env");
  return new TextEncoder().encode(secret);
}

export interface SessionPayload extends JWTPayload {
  sub: string; // user id
  name: string;
  email: string;
  role: string;
}

/** Gera um JWT assinado para a sessão do admin. */
export async function createToken(
  payload: Omit<SessionPayload, keyof JWTPayload>,
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());
}

/** Verifica um token e retorna o payload, ou null se inválido. */
export async function verifyToken(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/** Lê a sessão atual a partir do cookie (Server Components / Route Handlers). */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}

/** Grava o cookie de sessão. */
export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** Remove o cookie de sessão. */
export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
