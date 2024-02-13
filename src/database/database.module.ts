import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/test-nest?maxPoolSize=100',
      {
        // Mongoose connection options
      },
    ),
  ],
  exports: [MongooseModule], // Export the Mongoose module for global use
})
export class DatabaseModule {}
