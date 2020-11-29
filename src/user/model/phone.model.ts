import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class Phone {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(2, {message: `Phone type must be min 3 characteters long`})
    @MaxLength(100, {message: `Phone type must be less than 100 characters`})
    type: string;
    
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
    
    @IsNotEmpty()
    @IsString()
    countryCode: string;
}