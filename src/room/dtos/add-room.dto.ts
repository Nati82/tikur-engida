import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

export class AddRoomDTO {
  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  companyType: string;

  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsUUID()
  renterId: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumberString()
  rooms: number;

  @ApiProperty()
  @IsString()
  price: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'array',items: {type:'string', format: 'binary'} })
  pictures: string[];
}
