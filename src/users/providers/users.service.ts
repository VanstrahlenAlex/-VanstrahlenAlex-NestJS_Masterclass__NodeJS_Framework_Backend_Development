/* eslint-disable prettier/prettier */
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {

	constructor(
		//Injecting Auth Service
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) { 

	}
	public findAll(
		getUserParamDto: GetUsersParamDto,
		limit: number,
		page: number,
	){
		//Auth Service
		const isAuth = this.authService.isAuth();
		console.log(isAuth);
		
		return [
		{
			firstName: "John",
			email: "john@gmail.com"
		},
		{
			firstName: "Alice",
			email: "alice@gmail.com"
		},
		]
	}

	/**
	 * Find a user by ID
	 */

	public findOneByID(id: string) {
		return {
			id: 1234,
			firstName : "John",
			email: "john@gmail.com"
		}
	}
}