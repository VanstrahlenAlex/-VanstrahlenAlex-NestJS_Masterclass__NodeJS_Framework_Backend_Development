/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';

@Injectable()
export class UsersService {

	public findAll(
		getUserParamDto: GetUsersParamDto,
		limit: number,
		page: number,
	){
		
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

	public findOneByID(id: number) {
		return {
			id: 1234,
			firstName : "John",
			email: "john@gmail.com"
		}
	}
}