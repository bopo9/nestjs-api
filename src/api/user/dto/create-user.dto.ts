import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'email' })
  readonly email: string;

  @ApiProperty({ example: 'Name Surname', description: 'fullName' })
  readonly fullName: string;

  @ApiProperty({ example: '18', description: 'fullName' })
  readonly age: number;

  @ApiProperty({ example: '123wasd', description: 'password' })
  readonly password: string;
}
