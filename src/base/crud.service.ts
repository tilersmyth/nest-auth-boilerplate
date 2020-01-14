import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository, FindOneOptions, FindManyOptions, DeepPartial } from 'typeorm';
import { validate, ValidatorOptions } from 'class-validator';
import { DateTime } from 'luxon';

import { ExtendedEntity } from './extended.entity';

export class CrudService<T extends ExtendedEntity> {
  protected repository: Repository<T>;

  constructor(repository?: Repository<T>) {
    if (repository) {
      this.repository = repository;
    }
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  public async findOneById(id: string): Promise<T> {
    return this.repository.findOneOrFail(id);
  }

  public async findOne(options?: FindOneOptions<T>): Promise<T | null> {
    // https://github.com/typeorm/typeorm/issues/2500
    try {
      const result = await this.repository.findOneOrFail(options);
      return result;
    } catch (err) {
      return null;
    }
  }

  public async create(data: DeepPartial<T>): Promise<T> {
    const entity: T = this.repository.create(data);
    entity.createdAt = DateTime.utc();
    entity.updatedAt = DateTime.utc();
    await this.validate(entity, {
      groups: ['create'],
    });
    return entity.save();
  }

  public async update(data: DeepPartial<T> | T): Promise<T> {
    const id = String(data.id || '');
    return this.patch(id, data);
  }

  public async patch(id: string, data: DeepPartial<T> | T): Promise<T> {
    let entity: T;
    if (data instanceof ExtendedEntity) {
      entity = data;
    } else {
      entity = await this.findOneById(id);

      const { id: dataId, ...rest } = data;
      this.repository.merge(entity, rest as DeepPartial<T>);
    }
    let { createdAt } = entity;
    if (!createdAt) {
      createdAt = DateTime.utc();
    }
    entity.createdAt = createdAt;
    entity.updatedAt = DateTime.utc();

    await this.validate(entity, {
      groups: ['update'],
    });
    return entity.save();
  }

  public async delete(id: string): Promise<T> {
    const entity: T = await this.findOneById(id);
    await this.repository.delete(id);
    return entity;
  }

  protected async validate(entity: T, options?: ValidatorOptions) {
    const errors = await validate(entity, {
      validationError: {
        target: false,
        value: false,
      },
      options,
    } as ValidatorOptions);

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: errors,
          error: 'Validation',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
