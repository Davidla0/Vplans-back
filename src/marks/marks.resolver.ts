import { MarkService } from './marks.service';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Mark } from './marks.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MarkFilterInput } from './dto/marks.inputs';
import { UserRole } from 'src/users/roles/user.roles';
import { Roles } from 'src/users/roles/roles.decorator';
import { RolesGuard } from 'src/users/user.guard';

@Resolver()
export class MarkResolver {
  constructor(private readonly markService: MarkService) {}
  @Query(() => [Mark] || Mark)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT1, UserRole.MANAGER, UserRole.ADMIN, UserRole.TEACHER1)
  async marks(
    @Context() context,
    @Args('markFilterInput') markFilterInput: MarkFilterInput,
  ) {
    const role = context.req.user.role;
    if (role === UserRole.TEACHER1)
      return await this.markService.getTeacherMarks(markFilterInput);
    if (role === UserRole.ADMIN)
      return await this.markService.getAdminMarks(markFilterInput);
    if (role === UserRole.MANAGER)
      return await this.markService.getManagerMarks(markFilterInput);
    if (role === UserRole.STUDENT1)
      return await this.markService.getStudentMarks(markFilterInput);
  }
}
