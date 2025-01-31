import chalk from "chalk";
import { SQLWrapper } from "drizzle-orm";
import { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { BaseRepository } from "./BaseRepository";
import { FilterBuilder } from "./FIlterBuilder";
import { FindOptions, ID, OrderDirection } from "./IBaseRepository";
import { IBaserService } from "./IBaserService";

export abstract class BaseService<
  TTable extends PgTable & { id: SQLWrapper },
  TRepository extends BaseRepository<TTable> = BaseRepository<TTable>
> implements IBaserService<TTable>
{
  constructor(
    private readonly repository: TRepository
  ) // protected readonly config: AppConfig; // todo - add config later
  {}

  async findAll(options?: FindOptions) {
    const filter = options?.where
      ? FilterBuilder.build(options.where)
      : undefined;

    try {
      return await this.repository.findAll({
        where: filter,
        limit: options?.limit ?? 10, // this.config.pagination.limit,
        offset: options?.offset ?? 0,
        orderBy: this.transformOrderBy(options?.orderBy),
      });
    } catch (err) {
      this.handleError(err, "FindAll");
    }
  }

  async findById(id: ID): Promise<TTable["$inferSelect"] | null> {
    try {
      const item = await this.repository.findById(id);

      //Todo - Create Custom Error with status code
      if (!item) {
        throw new Error("Item not found");
      }

      return item;
    } catch (error) {
      this.handleError(error, "FindById");
    }
  }

  async create(data: TTable["$inferInsert"]): Promise<TTable["$inferSelect"]> {
    try {
      const item = await this.repository.create(data);
      return item;
    } catch (error) {
      this.handleError(error, "Create");
    }
  }

  async update(
    id: ID,
    data: Partial<TTable["$inferInsert"]>
  ): Promise<TTable["$inferSelect"]> {
    try {
      const item = await this.repository.update(id, data);

      if (!item) {
        throw new Error("Item not found");
      }

      return item;
    } catch (error) {
      this.handleError(error, "Update");
    }
  }

  async delete(id: ID): Promise<void> {
    try {
      await this.repository.delete(id);
    } catch (error) {
      this.handleError(error, "Delete");
    }
  }

  async checkExists(id: ID): Promise<boolean> {
    try {
      const exists = await this.repository.checkExistById(id);
      return exists;
    } catch (error) {
      this.handleError(error, "CheckExists");
    }
  }

  // Private method: complete later
  protected handleError(error: unknown, label: string): never {
    console.error(chalk.red(`${label} Error`), error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      typeof error === "string" ? error : "An unexpected error occurred"
    );
  }

  protected async catchError(callback: () => Promise<unknown>) {
    try {
      return await callback();
    } catch (error) {
      console.error(chalk.red("Error"), error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error(
        typeof error === "string" ? error : "An unexpected error occurred"
      );
    }
  }

  protected transformOrderBy(orderBy: FindOptions['orderBy']) {
		if (!orderBy) return undefined;
		const table = this.repository.getTable();

		return orderBy
			.filter((order) => order.column in table)
			.map((order) => ({
				column: table[order.column as keyof typeof table] as PgColumn,
				direction: order.direction as OrderDirection,
			}));
	}
}

