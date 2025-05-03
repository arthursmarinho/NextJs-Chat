import {IsNumber, IsString} from "class-validator";

export class CreateMessageBodyDto {
  @IsString()
  chatId: string;

  @IsString()
  message: string;

  @IsNumber()
  timestamp: number;

  @IsString()
  user: string;
}
