import { CategoryTable } from "@/db/schemas";
import { BaseService } from "@/lib/core/BaserService";
import { CategoryRepository } from "../Repository/category.repo";
import { injectable } from "tsyringe";

@injectable()export class CategoryService extends BaseService<
  typeof CategoryTable,
  CategoryRepository
> {
  constructor(repository: CategoryRepository) {
    super(repository);
  }
}

