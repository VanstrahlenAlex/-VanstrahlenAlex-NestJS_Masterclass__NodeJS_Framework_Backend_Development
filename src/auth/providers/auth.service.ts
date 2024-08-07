/* eslint-disable prettier/prettier */

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
	constructor(
		/**
		 * Injecting Users Service
		 */
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService,
	){

	}
	public login(email: string, password: string, id: string) {
		//Check user exists database
		const user = this.usersService.findOneByID(id);
		//login
		//token
		return  "SAMPLE_TOKEN";
	}

	public isAuth() {
		return true;
	}
}
