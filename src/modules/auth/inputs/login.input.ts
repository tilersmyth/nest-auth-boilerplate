import { InputType, Field } from 'type-graphql';

@InputType()
export class AuthLoginInput {
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}
