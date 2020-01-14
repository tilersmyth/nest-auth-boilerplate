import { BaseEntity, Column } from 'typeorm';
import { DateTime } from 'luxon';

export class ExtendedEntity extends BaseEntity {
  public id?: string;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @Column({ type: 'date' })
  public createdAt: DateTime;

  @Column({ type: 'date' })
  public updatedAt: DateTime;
}
