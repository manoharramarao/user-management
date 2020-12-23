import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class Address {
    
    @IsOptional()
    code: string;

    @IsNotEmpty({message: `Name can't be empty`})
    @IsString({message: `Name must be string`})
    @MinLength(4, {message: `Name should be more than 4 characters`})
    @MaxLength(200, {message: `Name should be less than 200 characters`})
    name: string;

    @IsOptional()
    aptNumber: string;
    
    @IsOptional()
    addressLine1: string;

    @IsOptional()
    addressLine2: string;
    
    @IsOptional()
    addressLine3: string;
    
    @IsOptional()
    state: string;

    @IsOptional()
    country: string;

    @IsOptional()
    zipcode: string;

    @IsOptional()
    pincode: string;

    @IsOptional()
    userCode: string;
}

export class Country {
    code: string;
    name: string;
}

export class State {
    code: string;
    name: string;
}