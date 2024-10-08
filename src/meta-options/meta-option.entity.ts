/* eslint-disable prettier/prettier */

import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MetaOption {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		length: 256,
		nullable: false,
		unique: true,
	})
	metaValue: string;

	@CreateDateColumn()
	createDate: Date;

	@UpdateDateColumn()
	updateDate: Date;

	@OneToOne(()=> Post, (post) => post.metaOptions, {
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	post: Post; 
}