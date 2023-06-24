import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly usersModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.usersModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return await this.usersModel.findOne({ email: email }).exec();
  }
}
