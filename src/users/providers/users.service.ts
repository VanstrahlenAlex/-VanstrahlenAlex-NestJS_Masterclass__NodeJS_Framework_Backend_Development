/* eslint-disable prettier/prettier */
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

	constructor(
		//Injecting usersRepository
		@InjectRepository(User)
        
		private usersRepository: Repository<User>,

		/**Injecting ConfigService */
		private readonly configService: ConfigService,
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
		
		const environment = this.configService.get<string>('S3_BUCKET');

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

	public async findOneById(id: number) {
		return await this.usersRepository.findOneBy({
			id,
		})
	}
}