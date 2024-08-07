/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
	constructor(
		/**
		 * Injecting Users Service
		 */
		private readonly usersService: UsersService,
	) { 

	}
	public findAll(userId: string){
		// Users Service
		// Find A User
		const user = this.usersService.findOneByID(userId);
		return [
			{
				user: user,
				title: 'Test Tile',
				content: 'Test Content',
			},
			{
				user: user,
				title: 'Test Tile 2',
				content: 'Test Content 2',
			}
		]
		
	}
}
