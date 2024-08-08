/* eslint-disable prettier/prettier */
import {IsInt, IsNotEmpty} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create-post.dto";

export class PatchPostDto extends PartialType(CreatePostDto) {
	@ApiProperty({
		description: "The ID of the post that needs to be updated"
	})
	@IsInt()
	@IsNotEmpty()
	id: number;
}