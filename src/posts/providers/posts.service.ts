/* eslint-disable prettier/prettier */

import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

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
		private readonly metaOptionsRepository: Repository<MetaOption>,
		/**
		 * Inject TagsService
		 */
		private readonly tagsService: TagsService,
	) {}

	public async create(@Body() createPostDto :CreatePostDto) {
		//Find author from database based on authorId
		let author = await this.usersService.findOneById(createPostDto.authorId);

		let tags = await this.tagsService.findMultipleTags(createPostDto.tags);
		//Create MetaOptions
		// let metaOptions =createPostDto.metaOptions ?  this.metaOptionsRepository.create(createPostDto.metaOptions) : null;

		// if(metaOptions){
		// 	await this.metaOptionsRepository.save(metaOptions);
		// }
		//Create Post
		let post = this.postsRepository.create({
			...createPostDto,
			author: author,
			tags: tags,
		});
		//Add MetaOptions to the post 
		if(metaOptions){
			post.metaOptions = metaOptions;
		}
		//Return the post
		return await this.postsRepository.save(post);
	}
	public async findAll(userId: string){

		let posts = await this.postsRepository.find({
			relations: {
				metaOptions: true,
				author: true,
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
	public async update(patchPostsDto: PatchPostDto){
		//Find the Tags
		let tags = await this.tagsService.findMultipleTags(patchPostsDto.tags);
		//Find the Post 
		let post = await this.postsRepository.findOneBy({
			id: patchPostsDto.id,
		})
		// Update the properties
		post.title = patchPostsDto.title ?? post.title; // { ...post, ...patchPostsDto }
        post.content = patchPostsDto.content ?? post.content;
        post.status = patchPostsDto.status ?? post.status;
        post.postType = patchPostsDto.postType ?? post.postType;
        post.slug = patchPostsDto.slug ?? post.slug;
        post.featuredImageUrl = patchPostsDto.featuredImageUrl ?? post.featuredImageUrl;
        post.publishOn = patchPostsDto.publishOn ?? post.publishOn;
        post.schema = patchPostsDto.schema;
		//Assign the new tags 
        post.tags = tags;

		//Save the post and return 
		return await this.postsRepository.save(post)
	}

	public async delete(id: number){
		await this.postsRepository.delete(id);

		//Confirmation 
		return { deleted: true, id}
	}
}
