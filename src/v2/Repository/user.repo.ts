import { UsersTable } from "@/db/schemas";
import { BaseRepository } from "@/lib/core/BaseRepository";

export class UserRepository extends BaseRepository<typeof UsersTable> {}
