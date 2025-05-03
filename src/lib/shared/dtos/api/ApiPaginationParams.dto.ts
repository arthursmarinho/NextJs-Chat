import {Transform, TransformFnParams} from "class-transformer";
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class ApiPagination<TFields extends string = string> {
  @IsInt()
  @Min(0)
  @Transform((params: TransformFnParams) => Number.parseInt(params.value, 10))
  cursor?: number = 0;

  @IsOptional()
  @IsArray()
  sort?: ApiPaginationSortOrder<TFields>[];

  @IsInt()
  @Min(1)
  @Max(100)
  @Transform((params: TransformFnParams) => Number.parseInt(params.value, 10))
  take: number;
}

export class ApiPaginationParamsDto<TFields extends string = string> {
  pagination: ApiPagination<TFields>;
}

export class ApiPaginationSortOrder<TFields extends string = string> {
  @IsOptional()
  @IsString()
  field: TFields;

  @IsOptional()
  @IsString()
  @IsIn(["ASC", "DESC"])
  order: "ASC" | "DESC" = "DESC";
}
