import { NewUser, UpdateUserSchema } from '@/db/schemas';
import { FilterRuleGroup } from '@/lib/core/FIlterBuilder';
import { FindOptionsSchema } from '@/lib/core/IBaseRepository';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(private readonly service: UserService) {}

  async findAll(req: Request, res: Response) {
    const parsedQuery = FindOptionsSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({ message: 'Invalid query' });
    }

    const users = await this.service.findAll(parsedQuery.data);
    res.status(200).json(users);
  }

  async findById(req: Request, res: Response) {
    const user = await this.service.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  async search(req: Request, res: Response) {
    const { query = '' } = req.query;
    const where: FilterRuleGroup = {
      combinator: 'or',
      rules: [
        {
          field: 'name',
          operator: 'contains',
          value: query,
        },
        {
          field: 'email',
          operator: 'contains',
          value: query,
        },
        {
          field: 'id',
          operator: '=',
          value: query,
        },
      ],
    };

    const users = await this.service.findAll({ where });
    res.status(200).json(users);
  }

  async create(req: Request, res: Response) {
     const userData: NewUser = req.body;
     if (!userData.email || !userData.password || !userData.name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await this.service.findByEmail(userData.email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const user = await this.service.create(req.body);
    res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const parsedBody = UpdateUserSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ message: 'Invalid body' });
    }

    const user = await this.service.update(req.params.id, parsedBody.data);
    res.status(200).json(user);
  }

  async delete(req: Request, res: Response) {
    await this.service.delete(req.params.id);
    res.status(204).send();
  }
}
