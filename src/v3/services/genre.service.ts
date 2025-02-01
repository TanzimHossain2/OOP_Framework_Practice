import { BookGenreTable } from "@/db/schemas";
import { BaseService } from "@/lib/core/BaserService";
import { BookGenreRepository } from "../Repository/genra.repo";
import { injectable } from "tsyringe";

@injectable()
export class BookGenreService extends BaseService<
  typeof BookGenreTable,
  BookGenreRepository
> {
  constructor(repository: BookGenreRepository) {
    super(repository);
  }
}

