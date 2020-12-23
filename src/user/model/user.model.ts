import { Type } from "class-transformer";
import { IsArray, IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { DoesUserExist } from "../validators/userid.validator";
import { Phone } from "./phone.model";
import { UserGroups } from "./user-groups.enum";
import { Address } from './address.model';

class User {

    @IsOptional()
    code: string;

    @IsNotEmpty({message: `User ID can't be empty`})
    @IsString()
    @MinLength(4, {message: 'ID should be more than 3 characters'})
    @MaxLength(100, {message: 'Choose shorter ID'})
    @DoesUserExist()
    userId: string;
    
    // @IsNotEmpty({message: 'First name is mandatory'})
    @IsNotEmpty({message:`Firstname can't be empty`})
    @IsString()
    @MinLength(3, {message: `First name must be min 3 characteters long`})
    @MaxLength(100, {message: `First name must be less than 100 characters`})
    firstName: string;

    @IsOptional()
    @IsString()
    @MinLength(3, {message: `First name must be min 3 characteters long`})
    @MaxLength(100, {message: `First name must be less than 100 characters`})
    middleName: string;
    
    @IsOptional()
    @IsString()
    @MinLength(3, {message: `First name must be min 3 characteters long`})
    @MaxLength(100, {message: `First name must be less than 100 characters`})
    lastName: string;

    @IsOptional()
    @IsArray()
    @IsEmail({}, {each: true, message: `Value should be an email`})
    emails: string[];

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => Phone)
    phones: Phone[];

    @IsOptional()
    @IsArray()
    @IsEnum(UserGroups, {each: true})
    userGroups: UserGroups[];

    @IsOptional()
    @IsArray()
    addresses: Address[];

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;

    @IsOptional()
    createdBy: string;

    @IsOptional()
    updatedBy: string;
}

export {
    User as User,
}