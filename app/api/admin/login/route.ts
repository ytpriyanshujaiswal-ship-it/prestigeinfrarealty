import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAdminSession } from '@/lib/admin-auth';
import { audit } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email =
      typeof body.email === 'string' ? body.email.trim() : '';

    const password =
      typeof body.password === 'string' ? body.password : '';

    const expectedEmail = process.env.ADMIN_EMAIL?.trim();
    const plainPassword = process.env.ADMIN_PASSWORD;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;

    if (
      !expectedEmail ||
      (!plainPassword && !passwordHash)
    ) {
      return NextResponse.json(
        {
          error:
            'Admin login is not configured. Check ADMIN_EMAIL and ADMIN_PASSWORD or ADMIN_PASSWORD_HASH in Render.',
        },
        { status: 503 },
      );
    }

    // Prefer ADMIN_PASSWORD when it is configured.
    // Use the bcrypt hash only if no plain password is configured.
    let validPassword = false;

    if (plainPassword) {
      validPassword = password === plainPassword;
    } else if (passwordHash) {
      validPassword = await bcrypt.compare(
        password,
        passwordHash,
      );
    }

    const validEmail =
      email.toLowerCase() === expectedEmail.toLowerCase();

    if (!validEmail || !validPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 },
      );
    }

    // This also checks that SESSION_SECRET is configured correctly.
    const token = await createAdminSession(expectedEmail);

    const response = NextResponse.json({ ok: true });

    response.cookies.set('prestige_admin', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    try {
      await audit(
        'login',
        'session',
        expectedEmail,
        {
          method: plainPassword ? 'environment-password' : 'bcrypt',
        },
        expectedEmail,
      );
    } catch {
      // A logging failure should not prevent a successful login.
    }

    return response;
  } catch (error) {
    console.error('Admin login failed:', error);

    return NextResponse.json(
      { error: 'Login configuration error. Check the server logs.' },
      { status: 500 },
    );
  }
}
