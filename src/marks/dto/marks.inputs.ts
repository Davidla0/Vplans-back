import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MarkFilterInput {
  @Field()
  name: string;

  @Field()
  className: string;

  @Field()
  teacher: string;

  @Field()
  mark: string;
}
