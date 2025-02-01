import { PostTable } from '@/db/schemas/post';
import { BaseRepository } from '@/lib/core/BaseRepository';
import { DatabaseClientToken, IDatabaseClient } from '@/lib/db/IDatabasClient';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PostRepository extends BaseRepository<typeof PostTable> {
  constructor(@inject(DatabaseClientToken) db: IDatabaseClient) {
    super(db, PostTable);
  }
}
