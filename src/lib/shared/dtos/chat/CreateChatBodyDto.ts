import { IsArray, IsString } from "class-validator";

export class CreateChatBodyDto {
  @IsString()
  id: string;

  @IsArray()
  @IsString()
  users: string;

  @IsArray()
  @IsString()
  message: string;
}
