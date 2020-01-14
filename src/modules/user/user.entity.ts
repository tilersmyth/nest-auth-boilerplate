import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { IsEmail, Length, MinLength } from 'class-validator';
import bcryptjs from 'bcryptjs';

import { ExtendedEntity } from '../../base/extended.entity';

@Entity('users')
export class UserEntity extends ExtendedEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @Length(3, 50, { message: 'must be between 3 and 50 characters' })
  public first_name: string;

  @Column('text')
  @Length(3, 50, { message: 'must be between 3 and 50 characters' })
  public last_name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail({}, { message: 'invalid format' })
  public email: string;

  @Column('text')
  @MinLength(8, { message: '8 character minimum' })
  public password: string;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    const salt = bcryptjs.genSaltSync();
    this.password = bcryptjs.hashSync(this.password, salt);
  }
}
