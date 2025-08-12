import { prisma } from '../../core/database';
import { EventEmitter } from 'events';

export const importEmitter = new EventEmitter();

/**
 * Process CSV buffer containing clients.
 * Expected CSV header: name,email,age,familyProfile
 */
export async function processClientsCsv(buffer: Buffer) {
  const text = buffer.toString('utf-8');
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return { total: 0, created: 0 };
  // remove header if present
  const header = lines[0].toLowerCase();
  let start = 0;
  if (header.includes('name') && header.includes('email')) start = 1;

  const total = lines.length - start;
  let created = 0;
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    const cols = line.split(',');
    const [name, email, ageStr, familyProfile] = cols.map(c => (c || '').trim());
    try {
      await prisma.client.create({
        data: {
          name: name || 'Unnamed',
          email: email || `imported+${Date.now()}@example.com`,
          age: Number(ageStr) || 0,
          familyProfile: familyProfile || ''
        }
      });
      created++;
    } catch (err) {
      // ignore duplicates or invalid rows
    }
    // emit progress
    importEmitter.emit('progress', { processed: i - start + 1, total, created });
    // small delay to emulate work
    await new Promise(r => setTimeout(r, 50));
  }
  importEmitter.emit('done', { total, created });
  return { total, created };
}
