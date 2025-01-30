import chalk from "chalk";
import { SQLWrapper } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { BaseRepository } from "./BaseRepository";
import { ID } from "./IBaseRepository";
import { IBaserService } from "./IBaserService";

export abstract class BaseService<
  TTable extends PgTable & { id: SQLWrapper },
  TRepository extends BaseRepository<TTable> = BaseRepository<TTable>
> implements IBaserService<TTable>
{
  constructor(private readonly repository: TRepository) {}

  findAll() {
    return "will implement later";
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
}

