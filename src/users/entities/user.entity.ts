import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Schema } from 'mongoose';
import { UserRole } from '../roles/user.roles';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field((type) => [UserRole])
  roles: UserRole[];
}

export const UserSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
