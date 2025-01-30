import { BaseRepository } from "@/lib/core/BaseRepository";
import { BookTable } from '../../db/schemas/book';

export class BookRepository extends BaseRepository<typeof BookTable> {}