/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MetaOptionsService {

	constructor(
		//Inject metaOptionsRepository
		@InjectRepository(MetaOption)
		private readonly metaOptionsRepository: Repository<MetaOption>,
	) { 
		
	}
	public async create( createPostMetaOptionsDto :CreatePostMetaOptionsDto){
		let metaOption = this.metaOptionsRepository.create( createPostMetaOptionsDto,);
		return await this.metaOptionsRepository.save(metaOption);
	}
}
