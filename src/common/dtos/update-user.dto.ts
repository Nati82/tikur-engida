import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({description: 'example: 2519090909'})
  @IsOptional()
  @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, { message: 'please provide a proper phone number' })
  phoneNo: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  profilePic: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: boolean;
}