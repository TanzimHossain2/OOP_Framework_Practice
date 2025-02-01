import { BookTable } from "@/db/schemas";
import { BaseService } from "@/lib/core/BaserService";
import { BookRepository } from "../Repository/book.repo";
import { injectable } from "tsyringe";

@injectable()
export class BookService extends BaseService<
  typeof BookTable,
  BookRepository
> {
  constructor(repository: BookRepository) {
    super(repository);
  }
}
