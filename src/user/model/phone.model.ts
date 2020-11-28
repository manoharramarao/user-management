import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Phone {
    
    @IsNotEmpty()
    @IsString()
    type: string;
    
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
    
    @IsNotEmpty()
    @IsString()
    countryCode: string;
}