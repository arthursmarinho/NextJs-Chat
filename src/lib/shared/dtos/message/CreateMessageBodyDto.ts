import { IsNumber, IsString } from "class-validator";

export class CreateMessageBodyDto {
  @IsString()
  id: string;

  @IsString()
  user: string;

  @IsString()
  message: string;

  @IsNumber()
  timestamp: number;
}
