import {IsNotEmpty, IsString} from "class-validator";

export class AuthSignInSsoBodyDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
