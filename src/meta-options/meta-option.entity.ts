/* eslint-disable prettier/prettier */

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}