import {NextResponse} from 'next/server';import {getDb} from '@/lib/db';
export const dynamic='force-dynamic';
export async function GET(){try{const sql=getDb();const rows=await sql`SELECT id,name,location,category,status,description,rera,media,amenities,configurations,map_url,model_3d_url,published,price,bsp,size,config,image,updated_at FROM projects WHERE published=true ORDER BY updated_at DESC`;return NextResponse.json(rows,{headers:{'Cache-Control':'no-store'}})}catch(e:any){return NextResponse.json({error:e.message||'Projects unavailable'},{status:500})}}
