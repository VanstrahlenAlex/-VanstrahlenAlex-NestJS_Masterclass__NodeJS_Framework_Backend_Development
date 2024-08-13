/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostMetaOptionsDto {

	@IsNotEmpty()
	metaValue: string;

	@IsNotEmpty()
	value: any;
}