import { ApiProperty } from "@nestjs/swagger/dist";
import { IsBoolean } from "class-validator";

export class ApproveRoomDTO {
  @ApiProperty()
  @IsBoolean()
  approved: boolean;
}
