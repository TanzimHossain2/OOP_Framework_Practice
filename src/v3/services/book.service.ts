import { BookTable } from "@/db/schemas";
import { BaseService } from "@/lib/core/BaserService";
import { BookRepository } from "../Repository/book.repo";

export class BookService extends BaseService<
  typeof BookTable,
  BookRepository
> {}
