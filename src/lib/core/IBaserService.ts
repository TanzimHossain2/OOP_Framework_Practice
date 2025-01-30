import { SQLWrapper } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { ID } from "./IBaseRepository";

export interface IBaserService<TTable extends PgTable & { id: SQLWrapper }> {
  findById(id: ID): Promise<TTable["$inferSelect"] | null>;
  create(data: TTable["$inferInsert"]): Promise<TTable["$inferSelect"]>;
  update(
    id: ID,
    data: Partial<TTable["$inferInsert"]>
  ): Promise<TTable["$inferSelect"]>;

  delete(id: ID): Promise<void>;
  checkExists(id: ID): Promise<boolean>;
}

