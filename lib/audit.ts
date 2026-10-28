import { getDb } from '@/lib/db';
export async function audit(action: string, entityType: string, entityId?: string | number | null, details: unknown = {}, actor = 'owner') {
  const sql = getDb();
  await sql`INSERT INTO admin_audit_log (actor, action, entity_type, entity_id, details) VALUES (${actor}, ${action}, ${entityType}, ${entityId == null ? null : String(entityId)}, ${JSON.stringify(details)}::jsonb)`;
}
