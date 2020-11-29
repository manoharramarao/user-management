import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { IsUserExist } from "../validators/userid.validator";
import { Phone } from "./phone.model";
import { UserGroups } from "./user-groups.enum";

class User {

    @IsOptional()
    code: string;

    @IsNotEmpty({message: `User ID can't be empty`})
    @IsString()
    @MinLength(4, {message: 'ID should be more than 3 characters'})
    @MaxLength(100, {message: 'Choose shorter ID'})
    @IsUserExist()
    userId: string;
    
    // @IsNotEmpty({message: 'First name is mandatory'})
    @IsNotEmpty({message:`Firstname can't be empty`})
    @IsString()
    firstName: string;

    @IsString()
    middleName: string;
    
    @IsString()
    lastName: string;

    @IsArray()
    @IsEmail({}, {each: true, message: `Value should be an email`})
    emails: string[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => Phone)
    phones: Phone[];

    @IsOptional()
    @IsEnum(UserGroups, {each: true})
    userGroups: UserGroups[];

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