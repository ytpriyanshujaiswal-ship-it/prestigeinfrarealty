import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

function getSecret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error('SESSION_SECRET must be set to a random value of at least 32 characters.');
  return new TextEncoder().encode(value);
}
export async function createAdminSession(email: string) {
  return new SignJWT({ email, role: 'owner' }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('8h').sign(getSecret());
}
export async function getAdminEmail(): Promise<string | null> {
  try {
    const token = cookies().get('prestige_admin')?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== 'owner' || typeof payload.email !== 'string') return null;
    return payload.email;
  } catch { return null; }
}
export async function isAdmin() { return Boolean(await getAdminEmail()); }
