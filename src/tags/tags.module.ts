/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagsService } from './providers/tags.service';

@Module({
	controllers: [TagsController],
	imports: [TypeOrmModule.forFeature([Tag])],
	providers: [TagsService],
	exports: [TagsService], // Make TagsService available for other modules to inject
})
export class TagsModule {}
