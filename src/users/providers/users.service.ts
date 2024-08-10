/* eslint-disable prettier/prettier */
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {

	constructor(
		//Injecting usersRepository
		@InjectRepository(User)
        
		private usersRepository: Repository<User>
	) { 

	}

	public async createUser(createUserDto: CreateUserDto){
		// Check is user exists with same email
		const existingUser = await this.usersRepository.findOne({
			where: {email: createUserDto.email}
		})
		//Handle exception
		//Create a new user
		let newUser = this.usersRepository.create(createUserDto);
		newUser = await this.usersRepository.save(newUser);

		return newUser;
	}
	public async findAll(
		getUserParamDto: GetUsersParamDto,
		limit: number,
		page: number,
	){
		// Remove Auth Service check as it's not available in this context
		
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