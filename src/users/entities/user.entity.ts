import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string; 

  @Prop({ required: true })
  password: string; 

  @Prop({ required: true, unique: true })
  email: string; 

  @Prop()
  name?: string | null;

  @Prop()
  dateOfBirth?: Date | null;

  @Prop()
  avatar?: string | null;

  @Prop({
    type: Object,
    default: null,
  })
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  } | null;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: false })
  isDeleted?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);