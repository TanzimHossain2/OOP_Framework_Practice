import { BookTable } from '@/db/schemas';
import { BaseRepository } from '@/lib/core/BaseRepository';
import { DatabaseClientToken, IDatabaseClient } from '@/lib/db/IDatabasClient';
import { inject, injectable } from 'tsyringe';

@injectable()
export class BookRepository extends BaseRepository<typeof BookTable> {
  constructor(@inject(DatabaseClientToken) db: IDatabaseClient) {
    super(db, BookTable);
  }
}
