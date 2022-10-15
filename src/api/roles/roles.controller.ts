import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Response } from 'express';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 200, type: Role })
  @Post('/create')
  public async create(@Body() roleDto: CreateRoleDto, @Res() res: Response) {
    try {
      const role = await this.rolesService.createRole(roleDto);

      if (role) {
        return res
          .status(200)
          .json({ role, message: 'Role created successfully.' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get('/all')
  getAllRoles(@Res() res: Response) {
    return this.rolesService
      .getAllRoles()
      .then((roles) => res.status(200).json(roles))
      .catch((err) => res.status(500).json(err));
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get role by roleName' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:name')
  getRoleByName(@Res() res: Response, @Param('name') name: string) {
    return this.rolesService
      .getRoleByName(name)
      .then((role) => res.status(200).json({ role }))
      .catch((errName) =>
        res.status(500).json({
          message: 'Oops, something went wrong. Please try again later. ',
          errName,
        }),
      );
  }
}
