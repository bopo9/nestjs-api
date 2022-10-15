import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../shchemas/user-roles.model';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
  email: string;
  fullName: string;
  roles: string[];
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'email@gmail.com', description: 'email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  @ApiProperty({ example: 'Name Surname', description: 'fullName' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @ApiProperty({ example: 'user', description: 'userRole' })
  @BelongsToMany(() => Role, () => UserRoles)
  roles: unknown;

  @ApiProperty({ example: '123wasd', description: 'password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'true', description: 'banned' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({ example: 'cuz russian', description: 'banReason' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;
}
