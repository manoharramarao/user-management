import { IsNotEmpty } from "class-validator";

export class UserCredentials {

    @IsNotEmpty({message: `username must have value`})
    username: string;

    @IsNotEmpty({message: `password must have value`})
    password: string;
}