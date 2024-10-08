/* eslint-disable prettier/prettier */
import { postStatus } from "../enums/postStatus.enum";
import { postType } from "../enums/postType.enum";
import { IsArray, IsEnum, IsInt, IsISO8601, IsJSON,  IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CreatePostMetaOptionsDto } from "../../meta-options/dtos/create-post-meta-options.dto";
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
		description: "Array of ids of tags",
		example: [1, 2]
	})
	@IsOptional()
	@IsArray()
	@IsInt({ each: true })
	tags?: number[];

	@ApiPropertyOptional({
		type: "object",
		required: false,
		items: {
			type: "object",
			properties: {
				metaValue: {
					type: "json",
					description: "The metaValue is a JSON string",
					example: '{"sidebarEnabled": true}',
				},
				
			}
		}
	})
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreatePostMetaOptionsDto)
	metaOptions: CreatePostMetaOptionsDto | null;

	@ApiProperty({
		type: 'integer',
		required: true,
		example: 1,
	})
	@IsNotEmpty()
	@IsInt()
	authorId: number; 


}