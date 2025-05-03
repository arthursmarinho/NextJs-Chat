import {Transform, TransformFnParams} from "class-transformer";
import {IsNumber} from "class-validator";

export class IdDto {
  @Transform((params: TransformFnParams) => {
    return Number.parseInt(params.value, 10);
  })
  @IsNumber()
  id: number;
}
