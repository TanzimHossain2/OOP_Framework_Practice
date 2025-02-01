import { PublisherTable } from "@/db/schemas";
import { BaseService } from "@/lib/core/BaserService";
import { PublisherRepository } from "../Repository/publisher.repo";
import { injectable } from "tsyringe";

@injectable()
export class PublisherService extends BaseService<
  typeof PublisherTable,
  PublisherRepository
> {
  constructor(repository: PublisherRepository) {
    super(repository);
  }
}

