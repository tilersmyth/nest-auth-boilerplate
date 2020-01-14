import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  readonly id: string;
  @Field()
  readonly first_name: string;
  @Field()
  readonly last_name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly created_at: Date;
}
