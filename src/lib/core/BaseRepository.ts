import { asc, desc, eq, inArray, sql, SQLWrapper } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { IDatabaseClient } from "../db/IDatabasClient";
import { FindOptionsQL, IBaseRepository, ID } from "./IBaseRepository";

export abstract class BaseRepository<
  TTable extends PgTable & { id: SQLWrapper }
> implements IBaseRepository<TTable>
{
  constructor(
    protected readonly db: IDatabaseClient,
    protected readonly table: TTable
  ) {}

  //Query function
  async findAll(options?: FindOptionsQL): Promise<TTable["$inferSelect"][]> {
    const result = await this.db.executeQuery("FindAll", async (db) => {
      let query = db.select().from(this.table).$dynamic();

      if (options?.where) {
        query = query.where(options.where.getSQL());
      }

      if (options?.orderBy && options.orderBy.length > 0) {
        const orderClause = options.orderBy.map((order) =>
          order.direction === "asc" ? asc(order.column) : desc(order.column)
        );
        query = query.orderBy(...orderClause);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      if (options?.offset) {
        query = query.offset(options.offset);
      }

      const records = await query.execute();
      return records;
    });

    return result;
  }

  async findById(id: ID): Promise<TTable["$inferSelect"] | null> {
    const result = await this.db.executeQuery("FindById", async (db) => {
      const records = await db
        .select()
        .from(this.table)
        .where(eq(this.table.id, id))
        .execute();

      return records[0] ?? null;
    });

    return result;
  }

  async findOne(where: SQLWrapper): Promise<TTable["$inferSelect"] | null> {
    const result = await this.db.executeQuery("FindById", async (db) => {
      const records = await db
        .select()
        .from(this.table)
        .where(where.getSQL())
        .execute();
      return records[0] ?? null;
    });

    return result;
  }

  async findAndCount(
    options?: FindOptionsQL
  ): Promise<[TTable["$inferSelect"][], number]> {
    const result = await this.db.executeQuery("FindAndCount", async (db) => {
      const recordsPromise = this.findAll(options);
      const countPromise = this.count(options?.where);

      const [records, count] = await Promise.all([
        recordsPromise,
        countPromise,
      ]);

      return [records, count] as [TTable["$inferSelect"][], number];
    });

    return result;
  }

  async count(where?: SQLWrapper): Promise<number> {
    const result = await this.db.executeQuery("Count", async (db) => {
      let query = db
        .select({ count: sql`count(*)` })
        .from(this.table)
        .$dynamic();

      if (where) {
        query = query.where(where.getSQL());
      }

      const records = await query.execute();
      return Number(records[0]?.count);
    });
    return result;
  }

  async checkExist(where: SQLWrapper): Promise<boolean> {
    const count = await this.count(where);
    return count > 0;
  }

  async checkExistById(id: ID): Promise<boolean> {
    return await this.checkExist(eq(this.table.id, id));
  }

  //Mutation function
  async create(data: TTable["$inferInsert"]): Promise<TTable["$inferSelect"]> {
    const result = await this.db.executeQuery("Create", async (db) => {
      const records = await db.insert(this.table).values(data).returning();

      return records[0];
    });
    return result as TTable["$inferSelect"];
  }

  async createMany(
    data: TTable["$inferInsert"][]
  ): Promise<TTable["$inferSelect"][]> {
    const result = await this.db.executeQuery("CreateMany", async (db) => {
      const records = await db
        .insert(this.table)
        .values(data)
        .returning()
        .execute();

      return records;
    });

    return result as TTable["$inferSelect"][];
  }

  //Update function
  async update(
    id: ID,
    data: Partial<TTable["$inferInsert"]>
  ): Promise<TTable["$inferSelect"] | null> {
    const result = await this.db.executeQuery("Update", async (db) => {
      const records = await db
        .update(this.table)
        .set(data)
        .where(eq(this.table.id, id))
        .returning()
        .execute();
      return records;
    });

    if (!result) {
      return null;
    }

    return (result as TTable["$inferSelect"][])[0];
  }

  async updateMany(
    data: Partial<TTable["$inferInsert"] & { id: ID }>[]
  ): Promise<TTable["$inferSelect"][]> {
    const result = await this.db.executeQuery("UpdateMany", async (db) => {
      const records = await db
        .update(this.table)
        .set(data)
        .where(eq(this.table.id, data[0].id))
        .returning()
        .execute();
      return records;
    });

    return result as TTable["$inferSelect"][];
  }

  //Delete function
  async delete(id: ID): Promise<void> {
    await this.db.executeQuery("Delete", async (db) => {
      await db.delete(this.table).where(eq(this.table.id, id)).execute();
    });
  }

  async deleteMany(ids: ID[]): Promise<void> {
    await this.db.executeQuery("DeleteMany", async (db) => {
      await db.delete(this.table).where(inArray(this.table.id, ids));
    });
  }

  getTable(): TTable {
    return this.table;
  }

}

