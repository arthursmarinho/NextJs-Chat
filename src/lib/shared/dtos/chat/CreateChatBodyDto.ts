import {IsArray, IsString} from "class-validator";

export class CreateChatBodyDto {
  @IsArray()
  @IsString()
  users: string[];
}
