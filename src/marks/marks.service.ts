import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mark } from './marks.model';
import { Model } from 'mongoose';
import { UserRole } from 'src/users/roles/user.roles';

@Injectable({})
export class MarkService {
  constructor(@InjectModel('Mark') private readonly marksModel: Model<Mark>) {}

  async insertMark(
    name: string,
    className: string,
    mark: number,
    teacher: string,
  ) {
    const newMark = new this.marksModel({
      name,
      className,
      mark,
      teacher,
    });

    const res = await newMark.save();
    return res.id;
  }

  async getAdminMarks(query: any) {
    const filter = this.getFilter(query);
    return await this.marksModel.find(filter);
  }
  async getStudentMarks(query: any) {
    const filter = this.getFilter(query);
    filter.name = {
      $regex: UserRole.STUDENT1.replace(/(\d)/g, ' $1'),
      $options: 'i',
    };
    return await this.marksModel.find(filter);
  }
  async getTeacherMarks(query: any) {
    const filter = this.getFilter(query);
    filter.teacher = {
      $regex: UserRole.TEACHER1.replace(/(\d)/g, ' $1'),
      $options: 'i',
    };
    return await this.marksModel.find(filter);
  }
  async getManagerMarks(query: any) {
    const filter = this.getFilter(query);
    if (filter.name?.$regex.includes('1'))
      filter.name = { $regex: /^Student 1$/, $options: 'i' };
    else if (filter.name?.$regex.includes('2'))
      filter.name = { $regex: /^Student 2$/, $options: 'i' };
    else filter.name = { $regex: /^(Student 1|Student 2)$/, $options: 'i' };
    return await this.marksModel.find(filter);
  }

  getFilter(query: any): any {
    const { name, className, teacher, mark } = query;
    const filter: any = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (className) {
      filter.className = { $regex: className, $options: 'i' };
    }

    if (teacher) {
      filter.teacher = { $regex: teacher, $options: 'i' };
    }

    if (mark) {
      filter.mark = mark;
    }
    return filter;
  }
}
