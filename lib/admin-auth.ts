import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
const secret=()=>new TextEncoder().encode(process.env.SESSION_SECRET || 'development-only-change-this-secret-before-deploying-please');
export async function createAdminSession(email:string){return new SignJWT({email,role:'owner'}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('8h').sign(secret())}
export async function isAdmin(){try{const token=cookies().get('prestige_admin')?.value;if(!token)return false;const {payload}=await jwtVerify(token,secret());return payload.role==='owner'}catch{return false}}
