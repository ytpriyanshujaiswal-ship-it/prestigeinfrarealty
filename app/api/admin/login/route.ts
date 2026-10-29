import { NextResponse } from 'next/server';
import { createAdminSession } from '@/lib/admin-auth';
import bcrypt from 'bcryptjs';
import { audit } from '@/lib/audit';
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const expectedEmail = process.env.ADMIN_EMAIL;
    const hash = process.env.ADMIN_PASSWORD_HASH;
    const plain = process.env.ADMIN_PASSWORD;
    if (!expectedEmail || (!hash && !plain)) return NextResponse.json({ error: 'Admin login is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD_HASH (recommended) in hosting environment variables.' }, { status: 503 });
    const validPassword = hash ? await bcrypt.compare(String(password || ''), hash) : String(password || '') === plain;
    if (String(email || '').trim().toLowerCase() !== expectedEmail.trim().toLowerCase() || !validPassword) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    const token = await createAdminSession(expectedEmail);
    const res = NextResponse.json({ ok: true });
    res.cookies.set('prestige_admin', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 60 * 60 * 8 });
    try { await audit('login', 'session', expectedEmail, { method: hash ? 'bcrypt' : 'environment-password' }, expectedEmail); } catch {}
    return res;
  } catch (e: any) { return NextResponse.json({ error: e.message || 'Login configuration error.' }, { status: 500 }); }
}
