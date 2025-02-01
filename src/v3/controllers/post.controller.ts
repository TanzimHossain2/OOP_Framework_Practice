import { Controller, Delete, Get, Post, Put, Use } from '@/lib/decorator';
import { injectable } from "tsyringe";
import { PostService } from "../services/post.service";
import { NextFunction, Request, Response } from 'express';
import { Cache, Logger } from '@/lib';

@injectable()
@Controller('/api/v3/post')
export class PostController {

  constructor(private readonly service: PostService,
    private readonly logger: Logger,
    private readonly cache: Cache
  ) {}

  @Get('/')
  async findAll(req: Request, res: Response, next: NextFunction) {

    if (this.cache.get('posts')) {
      this.logger.log('Returning posts from cache');
      return res.status(200).json(this.cache.get('posts'));
    }

    const posts = await this.service.findAll();
    this.logger.log(`Found ${posts.length} posts`);
    this.cache.set('posts', posts);

    res.status(200).json(posts);
  }

  @Get('/:id')
	async getPostById(req: Request, res: Response) {
		const { id } = req.params;
		const post = await this.service.findById(id);
		res.status(200).json(post);
	}

	@Post('/')
	async createPost(req: Request, res: Response) {
		const { title, content, userId } = req.body;
		const post = await this.service.create({
			title,
			content,
			author: userId,
		});
		res.status(201).json(post);
	}

	@Put('/:id')
	async updatePost(req: Request, res: Response) {
		const { id } = req.params;
		const { title, content, status } = req.body;
		const post = await this.service.update(id, {
			title,
			content,
			status,
		});
		res.status(200).json(post);
	}

	@Delete('/:id')
	async deletePost(req: Request, res: Response) {
		const { id } = req.params;
		await this.service.delete(id);
		res.status(204).send();
	}

  

}