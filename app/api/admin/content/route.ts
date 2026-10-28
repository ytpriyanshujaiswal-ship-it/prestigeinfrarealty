import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { isAdmin, getAdminEmail } from '@/lib/admin-auth';
import { audit } from '@/lib/audit';
export const dynamic = 'force-dynamic';
export async function GET() {
 if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 try { const sql=getDb(); const rows=await sql`SELECT key,value,updated_at FROM site_content ORDER BY key`; return NextResponse.json(rows); }
 catch(e:any){ return NextResponse.json({error:e.message||'Could not load site content'}, {status:500}); }
}
export async function PUT(req:Request) {
 if (!await isAdmin()) return NextResponse.json({error:'Unauthorized'}, {status:401});
 try {
  const body=await req.json(); const key=String(body.key||'').trim();
  if(!/^[a-zA-Z0-9_.-]{2,100}$/.test(key)) return NextResponse.json({error:'Invalid content key'}, {status:400});
  if(body.value===undefined) return NextResponse.json({error:'Content value is required'}, {status:400});
  const sql=getDb(); const rows=await sql`INSERT INTO site_content (key,value,updated_at) VALUES (${key},${JSON.stringify(body.value)}::jsonb,now()) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value,updated_at=now() RETURNING key,value,updated_at`;
  await audit('update','site_content',key,{key},(await getAdminEmail())||'owner');
  return NextResponse.json(rows[0]);
 } catch(e:any){return NextResponse.json({error:e.message||'Could not save site content'},{status:500});}
}
