import { UsersTable } from '@/db/schemas';
import { BaseRepository } from '@/lib/core/BaseRepository';
import { DatabaseClientToken, IDatabaseClient } from '@/lib/db/IDatabasClient';
import { eq } from 'drizzle-orm';
import { inject, injectable } from 'tsyringe';
@injectable()
export class UserRepository extends BaseRepository<typeof UsersTable> {
  constructor(@inject(DatabaseClientToken) db: IDatabaseClient) {
    super(db, UsersTable);
  }

  async findByEmail(email: string) {
    const result = await this.db.executeQuery('FindByEmail', async (db) => {
      const record = await db
        .select()
        .from(this.table)
        .where(eq(this.table.email, email))
        .limit(1) // Ensure only one record is returned
        .execute();

      return record[0] ?? null; // Return first record or null
    });

    return result;
  }
}
