import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/create')
  public create(@Body() userDto: CreateUserDto, @Res() res: Response) {
    return this.userService
      .createUser(userDto)
      .then((user) => res.status(201).json({ user }))
      .catch((err) =>
        res.status(500).json({ err, message: 'User created successfully.' }),
      );
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/all')
  public getAllUsers(@Res() res: Response) {
    return this.userService
      .getAllUsers()
      .then((users) => res.status(200).json({ users }))
      .catch((err) => res.status(500).json({ err }));
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:userId')
  public getUserById(@Param('userId') id, @Res() res: Response) {
    return this.userService
      .getUserById(id)
      .then((user) => res.status(200).json({ user }))
      .catch((err) => res.status(500).json({ err }));
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 200, type: User })
  @Put('/update/:userId')
  public updateUserById(
    @Param('userId') id,
    @Body() userDto: CreateUserDto,
    @Res() res: Response,
  ) {
    console.log(id);
    console.log(userDto);
    return this.userService
      .updateUser(id, userDto)
      .then(() =>
        res
          .status(200)
          .json({ status: 'ok', message: 'User successfully updated.' }),
      )
      .catch((err) => res.status(500).json({ err }));
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user partially by id' })
  @ApiResponse({ status: 200, type: User })
  @Patch('/update/:userId')
  public updateUserByIdPartially(
    @Param('userId') id,
    @Body() data,
    @Res() res: Response,
  ) {
    if (Object.keys(data).length > 1)
      return res.status(400).json({ message: 'Only 1 parameter.' });

    return this.userService
      .updateUserByIdPartially(id, data)
      .then(() =>
        res
          .status(200)
          .json({ status: 'ok', message: 'User successfully updated.' }),
      )
      .catch((err) => res.status(500).json({ err }));
  }
}
