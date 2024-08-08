/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostMetaOptionsDto {
	@IsString()
	@IsNotEmpty()
	key: string;

	@IsNotEmpty()
	value: any;
}