import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({description: 'example: 2519090909'})
  @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, { message: 'please provide a proper phone number' })
  phoneNo: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', format: 'binary' })
  profilePic: string;
}
