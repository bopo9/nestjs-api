import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(roleDto: CreateRoleDto) {
    console.log('role name', roleDto);
    return await this.roleRepository.create(roleDto);
  }

  async getRoleByName(name: string) {
    return await this.roleRepository.findOne({ where: { name } });
  }

  async getAllRoles() {
    return await this.roleRepository.findAll();
  }
}
