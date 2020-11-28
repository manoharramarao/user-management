import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Phone } from "./phone.model";
import { UserGroups } from "./user-groups.enum";

class User {

    @IsOptional()
    code: string;
    
    // @IsNotEmpty({message: 'First name is mandatory'})
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsString()
    middleName: string;
    
    @IsString()
    lastName: string;

    @IsArray()
    @IsEmail({}, {each: true})
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