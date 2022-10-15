import { User } from './user.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  public async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role: Role = await this.rolesService.getRoleByName('user');

    if (!role) {
      throw new HttpException('Role doesnt exist', HttpStatus.BAD_REQUEST);
    }

    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  public async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  public async getUserById(userId) {
    return await this.userRepository.findOne({
      where: { id: userId },
      include: { all: true },
    });
  }

  public async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  public async updateUser(id, userDto) {
    return await this.userRepository.upsert(userDto);
  }

  public async updateUserByIdPartially(id, data) {
    return await this.userRepository.update(data, { where: { id } });
  }
}
