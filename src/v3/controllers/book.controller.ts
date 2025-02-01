import { Cache, Logger } from '@/lib';
import { FilterRuleGroup } from '@/lib/core/FIlterBuilder';
import { FindOptionsSchema } from '@/lib/core/IBaseRepository';
import { Controller, Delete, Get, Post, Put } from '@/lib/decorator';
import { Request, Response } from 'express';
import { singleton } from 'tsyringe';
import { BookService } from '../services/book.service';

@Controller('/books')
@singleton()
export class BookController {
  constructor(
    private readonly service: BookService,
    private readonly logger: Logger,
    private readonly cache: Cache
  ) {}

  @Get('/')
  async findAll(req: Request, res: Response) {
    const parsedQuery = FindOptionsSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      res.status(400).json({ message: 'Invalid query parameters' });
      return;
    }

    if (this.cache.get('books')) {
      this.logger.log('Returning users from cache');
      return res.status(200).json(this.cache.get('books'));
    }

    const books = await this.service.findAll(parsedQuery.data);

    this.logger.log(`Found ${books.length} books`);
    this.cache.set('books', books);

    res.status(200).json(books);
  }

  @Get('/:id')
  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const book = await this.service.findById(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  }

  @Get('/search')
  async search(req: Request, res: Response) {
    const { query = '' } = req.query;

    const where: FilterRuleGroup = {
      combinator: 'or',
      rules: [
        {
          field: 'title',
          operator: 'contains',
          value: query,
        },
        {
          field: 'author',
          operator: 'contains',
          value: query,
        },
        {
          field: 'summary',
          operator: 'contains',
          value: query,
        },
      ],
    };

    const books = await this.service.findAll({ where });
    res.status(200).json(books);
  }

  @Post('/')
  async create(req: Request, res: Response) {
    const book = await this.service.create(req.body);
    res.status(201).json(book);
  }

  @Put('/:id')
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const book = await this.service.update(id, req.body);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  }

  @Delete('/:id')
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.delete(id);
    res.status(204).send();
  }
}
