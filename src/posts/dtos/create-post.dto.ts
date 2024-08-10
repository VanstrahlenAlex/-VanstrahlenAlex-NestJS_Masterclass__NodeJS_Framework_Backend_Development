/* eslint-disable prettier/prettier */
import { postStatus } from "../enums/postStatus.enum";
import { postType } from "../enums/postType.enum";
import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CreatePostMetaOptionsDto } from "./create-post-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
	@ApiProperty({
		description: "This is the title of the blog post",
	})
	@IsString()
	@MinLength(4)
	@MaxLength(512)
	@IsNotEmpty()
	title: string;

	@ApiProperty({
		enum: postType,
		description: "Possible values are: post, page, story, series",
	})
	@IsEnum(postType)
	@IsNotEmpty()
	postType: postType;

	@ApiProperty({
		description: "For Example - This is the slug of the blog post",
		example: "my-url"
	})
	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
		message: 'A slug should be all small letters and uses only "-" and without spaces. For example: "my-url"',
	})
	@MaxLength(256)
	slug: string;

	@ApiProperty({
		description: "Possible values are: draft, scheduled, review, published",
		example: "draft"
	})
	@IsEnum(postStatus)
	@IsNotEmpty()
	status: postStatus;

	@IsString()
	@IsOptional()
	content?: string;

	@ApiPropertyOptional({
		description: "Serialize your json object else a validation error will be thrown",
		example: "{\r\n \"@context\": \"https:\/\/schema.org\",\r\n \"@type\": \"Person\"\r\n }"
	})
	@IsOptional()
	@IsJSON()
	schema?: string;

	@ApiPropertyOptional({
		description: "Featured Image for your blog post",
		example: "http://localhost.com/images/image1.jpg"
	})
	@IsOptional()
	@IsUrl()
	@MaxLength(1024)

	featuredImageUrl?: string;

	@ApiPropertyOptional({
		description: "Publish Date of the blog post",
		example: "2022-01-01T00:00:00.000Z"
	})
	@IsISO8601()
	@IsOptional()
	publishOn?: Date;

	@ApiPropertyOptional({
		description: "This is the excerpt of the blog post",
		example: ['nestjs', 'typescript']
	})
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@MinLength(3, { each: true})
	tags?: string[];

	@ApiPropertyOptional({
		type: "array",
		required: false,
		items: {
			type: "object",
			properties: {
				key: {
					type: "string",
					description: "The key can be any string identifier for your meta option",
					example: "sidebarEnabled"
				},
				value: {
					type: "any",
					description: "Any value that you want to save to the key",
					example: "sidebarEnabled"
				},
			}
		}
	})
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreatePostMetaOptionsDto)
	metaOptions: CreatePostMetaOptionsDto[]
}