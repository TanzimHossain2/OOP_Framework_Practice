import { SQLWrapper } from "drizzle-orm";
import { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { z } from "zod";
import { FilterRuleGroupSchema, OrderDirection } from "./FIlterBuilder";

export type ID = number | string;
export type OrderDirection = "asc" | "desc";

export type FindOptionsQL = {
  where?: SQLWrapper;
  limit?: number;
  offset?: number;
  orderBy?: {
    column: PgColumn;
    direction: OrderDirection;
  }[];
};

export const FindOptionsSchema = z
  .object({
    where: FilterRuleGroupSchema,
    limit: z.number().default(10), //todo - use app configaration for default value
    offset: z.number().default(0),
    orderBy: z.array(
      z.object({
        column: z.string(),
        direction: z.enum(OrderDirection),
      })
    ),
  })
  .partial();

export type FindOptions = z.infer<typeof FindOptionsSchema>;

export interface IBaseRepository<TTable extends PgTable & { id: SQLWrapper }> {
  //Query function
  findAll(options?: FindOptionsQL): Promise<TTable["$inferSelect"][]>;
  findById(id: ID): Promise<TTable["$inferSelect"] | null>;
  findOne(where: SQLWrapper): Promise<TTable["$inferSelect"] | null>;
  findAndCount(
    where?: FindOptionsQL
  ): Promise<[TTable["$inferSelect"][], number]>;

  count(where?: SQLWrapper): Promise<number>;
  checkExist(where: SQLWrapper): Promise<boolean>;
  checkExistById(id: ID): Promise<boolean>;

  //Mutation function
  create(data: TTable["$inferInsert"]): Promise<TTable["$inferSelect"]>;
  createMany(data: TTable["$inferInsert"][]): Promise<TTable["$inferSelect"][]>;

  //Update function
  update(
    id: ID,
    data: Partial<TTable["$inferInsert"]>
  ): Promise<TTable["$inferSelect"] | null>;

  updateMany(
    data: Partial<TTable["$inferInsert"] & { id: ID }>[]
  ): Promise<TTable["$inferSelect"][] | null>;

  //Delete function
  delete(id: ID): Promise<void>;
  deleteMany(ids: ID[]): Promise<void>;
  getTable(): TTable;
}

