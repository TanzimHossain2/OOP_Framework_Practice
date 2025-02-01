import { PostTable } from '@/db/schemas/post';
import { BaseService } from '@/lib/core/BaserService';
import { injectable } from 'tsyringe';
import { PostRepository } from '../Repository/post.repo';

@injectable()
export class PostService extends BaseService<typeof PostTable, PostRepository> {
  constructor(repository: PostRepository) {
    super(repository);
  }
}

