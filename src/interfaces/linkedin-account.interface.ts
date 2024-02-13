import mongoose from 'mongoose';

// Document interface
export interface LinkedInAccountInterface {
  user_id: mongoose.Schema.Types.ObjectId;
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
  sub: string;
  email_verified: boolean;
}
