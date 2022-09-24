import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';
import { Renter } from 'src/renter/entities/renter.entity';

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
  renterId: any;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumberString()
  beds: number;

  @ApiProperty()
  @IsString()
  price: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'array',items: {type:'string', format: 'binary'} })
  pictures: string[];
}
