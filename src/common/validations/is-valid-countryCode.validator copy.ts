import {
  registerDecorator,
  ValidationOptions,
  buildMessage,
} from 'class-validator';
import * as countryCodeLookup from 'country-code-lookup';

export function IsValidCountryCode(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsValidCountryCode',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const isValid = countryCodeLookup.byIso(
            isNaN(+value) ? value : +value,
          );

          return !!isValid;
        },
        defaultMessage: buildMessage(() => {
          return `$property must be a valid country code`;
        }, validationOptions),
      },
    });
  };
}
