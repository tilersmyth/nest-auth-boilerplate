import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrudService } from '../../base/crud.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) protected readonly repository: Repository<UserEntity>) {
    super();
  }

  public async find(): Promise<UserEntity[]> {
    return this.repository.find();
  }
}
