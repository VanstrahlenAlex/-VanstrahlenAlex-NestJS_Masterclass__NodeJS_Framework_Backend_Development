/* eslint-disable prettier/prettier */

import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
	constructor(
		/**
		 * Injecting Users Service
		 */
		private readonly usersService: UsersService,
		//Inject postRepository
		@InjectRepository(Post)
		private readonly postsRepository: Repository<Post>,

		//inject metaOptionsRepository
		@InjectRepository(MetaOption)
		public readonly metaOptionsRepository: Repository<MetaOption>,
	) {}

	public async create(@Body() createPostDto :CreatePostDto) {
		//Create MetaOptions
		let metaOptions =createPostDto.metaOptions ?  this.metaOptionsRepository.create(createPostDto.metaOptions) : null;

		if(metaOptions){
			await this.metaOptionsRepository.save(metaOptions);
		}
		//Create Post
		let post = this.postsRepository.create(createPostDto);
		//Add MetaOptions to the post 
		if(metaOptions){
			post.metaOptions = metaOptions;
		}
		//Return the post
		return await this.postsRepository.save(post);
	}
	public async findAll(userId: string){
		// Users Service
		// Find A User
		const user = this.usersService.findOneByID(userId);
		let posts = await this.postsRepository.find({
			relations: {
				metaOptions: true,
			}
		})

		return posts;
		// return [
		// 	{
		// 		user: user,
		// 		title: 'Test Tile',
		// 		content: 'Test Content',
		// 	},
		// 	{
		// 		user: user,
		// 		title: 'Test Tile 2',
		// 		content: 'Test Content 2',
		// 	}
		// ]
		
	}

	public async delete(id: number){
		//Find the post
		let post = await this.postsRepository.findOneBy({ id });
		//Deleting the post 
		await this.postsRepository.delete(id);

		//Delete meta options
		await this.metaOptionsRepository.delete(post.metaOptions.id)
		//Confirmation 
		return { deleted: true, id}
	}
}
