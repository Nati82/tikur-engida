import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class AddRoomDTO {
  @ApiProperty()
  @IsString()
  city: string;

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
  @IsNumber()
  rooms: number;

  @ApiProperty()
  @IsString()
  price: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'array',items: {type:'string', format: 'binary'} })
  pictures: string[];
}
