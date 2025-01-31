import { BookGenreTable } from "@/db/schemas";
import { BaseRepository } from "@/lib/core/BaseRepository";

export class BookGenreRepository extends BaseRepository<
  typeof BookGenreTable
> {}

