import { UsersTable } from '@/db/schemas';
import { BaseService } from '@/lib/core/BaserService';
import { UserRepository } from '../Repository/user.repo';

export class UserService extends BaseService<
  typeof UsersTable,
  UserRepository
> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}

