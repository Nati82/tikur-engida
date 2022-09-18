import { ApiProperty } from "@nestjs/swagger/dist";
import { IsBoolean } from "class-validator";
import { AddRoomDTO } from './add-room.dto';

export class UpdateRoomDTO extends AddRoomDTO {
  @ApiProperty()
  @IsBoolean()
  reserved: boolean;
}
