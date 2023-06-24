import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarkModule } from './marks/marks.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MarkModule,
    MongooseModule.forRoot(
      `mongodb+srv://david:david@cluster0.rk6kpjb.mongodb.net/`,
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
