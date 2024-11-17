// import { Role } from 'src/types';
import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/types';

export const Roles: Role[] = ['INTERN', 'ENGINEER', 'ADMIN'];

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(Roles, { message: 'Valid role required!' })
  role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
