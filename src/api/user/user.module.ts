import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../shchemas/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    forwardRef(() => RolesModule),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UsersModule {}
