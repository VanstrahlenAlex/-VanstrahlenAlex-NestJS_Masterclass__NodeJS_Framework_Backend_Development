/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Patch, Put, Delete, Param, Query, Body, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UsersController {
	@Get('/:id/:optional?')
	public getUsers(@Param() params: any, @Query() query: any) {
		console.log(params);
		console.log(query);
		return "You sent a get request to users endpoints"
	}

	@Post()
	public createUsers(@Req() request: Request) {
		console.log(request);
		
		return "You sent a post request to users endpoints"
	}
}
