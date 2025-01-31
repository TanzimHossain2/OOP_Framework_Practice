import { CategoryTable } from "@/db/schemas";
import { BaseRepository } from "@/lib/core/BaseRepository";

export class CategoryRepository extends BaseRepository<typeof CategoryTable> {}

