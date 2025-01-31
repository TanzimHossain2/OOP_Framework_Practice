import { BookGenreTable } from "@/db/schemas";
import { BaseService } from "@/lib/core/BaserService";
import { BookGenreRepository } from "../Repository/genra.repo";

export class BookGenreService extends BaseService<
  typeof BookGenreTable,
  BookGenreRepository
> {}

