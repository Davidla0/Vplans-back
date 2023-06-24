import { Field, Int, ObjectType } from '@nestjs/graphql';
import mongoose, { Schema, Document } from 'mongoose';

export interface Mark extends Document {
  name: string;
  className: string;
  mark: number;
  teacher: string;
}

export const MarkSchema = new Schema<Mark>({
  name: { type: String, required: true },
  className: { type: String, required: true },
  mark: { type: Number, required: true },
  teacher: { type: String, required: true },
});

@ObjectType()
export class Mark {
  @Field(() => String)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  className: string;

  @Field(() => Int)
  mark: number;

  @Field(() => String)
  teacher: string;
}

export const MarksModel = mongoose.model<Mark>('Mark', MarkSchema);
