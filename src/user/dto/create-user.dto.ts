import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsPhoneNumberInRegion } from '../../common/validations/is-phone-number.validator';
import { IsValidCountryCode } from '../../common/validations/is-valid-countryCode.validator copy';

export class CreateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  @IsPhoneNumberInRegion('countryCode')
  phone_number: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  @IsValidCountryCode()
  country_code: string;

  @IsOptional()
  profile_image?: string;
}
