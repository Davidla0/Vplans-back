import { Module } from '@nestjs/common';
import { MarkService } from './marks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MarkSchema } from './marks.model';
import { MarkResolver } from './marks.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Mark', schema: MarkSchema }]),
    UsersModule,
  ],
  providers: [MarkService, MarkResolver],
})
export class MarkModule {}
