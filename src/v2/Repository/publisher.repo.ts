import { PublisherTable } from "@/db/schemas";
import { BaseRepository } from "@/lib/core/BaseRepository";

export class PublisherRepository extends BaseRepository<
  typeof PublisherTable
> {}

