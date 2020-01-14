import { InputType, Field } from 'type-graphql';

@InputType()
export class AuthRegisterInput {
  @Field()
  readonly first_name: string;
  @Field()
  readonly last_name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}
