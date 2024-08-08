/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
@Controller('posts')
@ApiTags('Posts')
export class PostsController {
	constructor(
		/**
		 * Injecting Posts Service
		 */
		private readonly postsService: PostsService
	){

	}

	@Get('/:userId?')
	public getPosts(@Param('userId') userId: string){
		return this.postsService.findAll(userId);
	}

	@Post()
	public createPost(@Body() createPostDto : CreatePostDto){
		return {
			message: "Post created successfully"
		}
	}

	@Patch()
	public updatePost(@Body() patchPostsDto: PatchPostDto){
		console.log(patchPostsDto);
		
	}
}
