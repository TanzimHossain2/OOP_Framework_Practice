import { UsersTable } from '@/db/schemas';
import { Email, Logger } from '@/lib';
import { BaseService } from '@/lib/core/BaserService';
import { injectable } from 'tsyringe';
import { UserRepository } from '../Repository/user.repo';

@injectable()
export class UserService extends BaseService<
  typeof UsersTable,
  UserRepository
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly email: Email,
    private readonly logger: Logger
  ) {
    super(userRepository);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
  async forgetPassword(userId: string) {
    try {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      const token = `${user.id}-${user.email}-${user.password}`;

      // Circuit Breaker with retry mechanism
      try {
        await this.email.send(user.email, token);
      } catch (error) {
        this.logger.error('Failed to send email, problem with email service');
        this.handleError(error, 'Send_Email');
      }
    } catch (error) {
      this.handleError(error, 'Forget_Password');
    }
  }
}
