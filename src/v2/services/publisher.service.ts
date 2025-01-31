import { PublisherTable } from "@/db/schemas";
import { BaseService } from "@/lib/core/BaserService";
import { PublisherRepository } from "../Repository/publisher.repo";

export class PublisherService extends BaseService<
  typeof PublisherTable,
  PublisherRepository
> {}

