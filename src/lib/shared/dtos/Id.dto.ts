import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class IdDto {
  id: string;
}
