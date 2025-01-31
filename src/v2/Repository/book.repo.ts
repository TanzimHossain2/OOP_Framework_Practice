import { BookTable } from "@/db/schemas";
import { BaseRepository } from "@/lib/core/BaseRepository";

export class BookRepository extends BaseRepository<typeof BookTable> {}
