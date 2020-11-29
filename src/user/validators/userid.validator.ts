import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Db } from "mongodb";
import { UserDao } from "../user.dao";


@ValidatorConstraint({ async: true })
@Injectable()
export class DoesUserExistConstraint implements ValidatorConstraintInterface {

    constructor(
        protected readonly userDao: UserDao
    ){}
    private logger = new Logger(DoesUserExistConstraint.name);

    async validate(userId: any, args?: ValidationArguments): Promise<boolean> {
        return !await this.userDao.doesUserExist(userId);
    }
    defaultMessage?(args?: ValidationArguments): string {
        return `User ${args.object['userId']} already exists`;
    }
}

export function DoesUserExist(validationOptions?: ValidationOptions){
    return function(object: Object, propertyName: string){
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: DoesUserExistConstraint,
        });
    };
}