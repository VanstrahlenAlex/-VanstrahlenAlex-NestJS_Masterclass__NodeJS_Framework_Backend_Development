/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Patch, Put, Delete, Param, Query, Body, Req, Headers, Ip,
	ParseIntPipe, DefaultValuePipe, ValidationPipe
 } from '@nestjs/common';
// import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from '../users/providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {

	constructor(
		//Injecting Users Service
		private readonly usersService: UsersService) { }
	@Get('/:id?')
	@ApiOperation({
		summary: "Fetches a list of registered users on the application",
		description: "This endpoint fetches a list of registered users on the application"
	})
	@ApiResponse({
		status: 200,
		description: "User fetched successfully based on the query params",
	})
	@ApiQuery({
		name: 'limit',
		type: 'number',
		required: false,
		description: 'The number of entries returned per query',
		example: 10
	})
	@ApiQuery({
		name: 'page',
		type: 'number',
		required: false,
		description: 'The position of the page number that you want the API to return',
		example: 10
	})
	public getUsers(
		@Param() getUserParamDto: GetUsersParamDto,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
		@Query('page', new DefaultValuePipe(10), ParseIntPipe) page: number,

		
	) {
		console.log(getUserParamDto);
		console.log(typeof limit);
		return this.usersService.findAll(getUserParamDto, limit, page)
	}

	@Post()
	public createUsers(
		@Body(new ValidationPipe()) createUserDto: CreateUserDto,
	
	) {
		console.log(createUserDto instanceof CreateUserDto);	
		return "You sent a post request to users endpoints"
	}

	@Patch()
	public patchUser(@Body() patchUserDto : PatchUserDto){
		return patchUserDto;
	}
}
