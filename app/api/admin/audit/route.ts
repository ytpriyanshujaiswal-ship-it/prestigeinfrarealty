import {NextResponse} from 'next/server';import {getDb} from '@/lib/db';import {isAdmin} from '@/lib/admin-auth';
export const dynamic='force-dynamic';
export async function GET(){if(!await isAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});try{const sql=getDb();return NextResponse.json(await sql`SELECT id,actor,action,entity_type,entity_id,details,created_at FROM admin_audit_log ORDER BY created_at DESC LIMIT 200`)}catch(e:any){return NextResponse.json({error:e.message||'Could not load audit log. Run latest schema.'},{status:500})}}
