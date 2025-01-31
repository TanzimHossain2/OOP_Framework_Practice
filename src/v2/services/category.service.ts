import { CategoryTable } from "@/db/schemas";
import { BaseService } from "@/lib/core/BaserService";
import { CategoryRepository } from "../Repository/category.repo";

export class CategoryService extends BaseService<
  typeof CategoryTable,
  CategoryRepository
> {}

