import { BookGenreTable } from '@/db/schemas';
import { BaseRepository } from '@/lib/core/BaseRepository';
import { DatabaseClientToken, IDatabaseClient } from '@/lib/db/IDatabasClient';
import { inject, injectable } from 'tsyringe';
@injectable()
export class BookGenreRepository extends BaseRepository<typeof BookGenreTable> {
  constructor(
    @inject(DatabaseClientToken) db: IDatabaseClient,
  ) {
    super(db, BookGenreTable);
  }
}
