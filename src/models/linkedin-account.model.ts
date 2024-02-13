// user.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.model';
import { LinkedInAccountInterface } from 'src/interfaces/linkedin-account.interface';

@Schema()
export class LinkedInAccount
  extends Document
  implements LinkedInAccountInterface
{
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String })
  access_token: string;

  @Prop({ type: Number })
  expires_in: number;

  @Prop({ type: String })
  scope: string;

  @Prop({ type: String })
  token_type: string;

  @Prop({ type: String })
  id_token: string;

  @Prop({ type: String })
  sub: string;

  @Prop({ type: Boolean })
  email_verified: boolean;

  // other fields as needed
}

export const LinkedInAccountModel =
  SchemaFactory.createForClass(LinkedInAccount);
