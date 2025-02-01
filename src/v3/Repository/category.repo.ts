import { CategoryTable } from '@/db/schemas';
import { BaseRepository } from '@/lib/core/BaseRepository';
import { DatabaseClientToken, IDatabaseClient } from '@/lib/db/IDatabasClient';

import { inject, injectable } from 'tsyringe';
@injectable()
export class CategoryRepository extends BaseRepository<typeof CategoryTable> {
  constructor(
    @inject(DatabaseClientToken) db: IDatabaseClient,
  ) {
    super(db, CategoryTable);
  }
}
