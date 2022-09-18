import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { UpdateUserDTO } from 'src/common/dtos/update-user.dto';

export class UpdateRenterDTO extends UpdateUserDTO {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  Id: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  status: boolean;
}
