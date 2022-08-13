import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isPhoneNumber,
  buildMessage,
} from 'class-validator';

export function IsPhoneNumberInRegion(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsPhoneNumberInRegion',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [countryCodeField] = args.constraints;
          const countryCode = (args.object as any)[countryCodeField];
          return isPhoneNumber(value, countryCode); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
        defaultMessage: buildMessage(() => {
          return `$property must be a valid phone number in the specified region`;
        }, validationOptions),
      },
    });
  };
}
