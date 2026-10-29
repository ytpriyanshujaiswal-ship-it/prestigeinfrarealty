import {NextResponse} from 'next/server';import {getDb} from '@/lib/db';
export const dynamic='force-dynamic';
export async function GET(){try{const sql=getDb();const rows=await sql`SELECT key,value FROM site_content WHERE key NOT LIKE 'draft.%'`;return NextResponse.json(Object.fromEntries(rows.map((r:any)=>[r.key,r.value])),{headers:{'Cache-Control':'no-store'}})}catch(e:any){return NextResponse.json({error:e.message||'Site content unavailable'},{status:500})}}
