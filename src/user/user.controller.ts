import { Body, Controller, Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from './model/user.model';
import { UserService } from './user.service';
// import { SignUpValidationPipe } from './pipes/signup-req-validation.pipe';
import { GlobalRpcExceptionsFilter } from '../utility/filters/rpc-exception.filter';
import { Address } from './model/address.model';
import { UserCredentials } from './dto/sign-in-req.dto';
import { SetPassReqDto } from './dto/set-pass-req.dto';
import { SignInResDto } from './dto/sign-in-res.dto';

@Controller('user')
@UseFilters(GlobalRpcExceptionsFilter)
export class UserController {
    private logger = new Logger(UserController.name);
    constructor(
        private userService: UserService
    ){}

    @GrpcMethod('UmsService', 'SignUp')
    // @UsePipes(new ValidationPipe({ transform: true }))
    async signUp(@Body(ValidationPipe) body: User): Promise<User>{
        await this.logger.debug(body);
        let user = new User();
        user = await this.userService.signUp(body);
        return user;
    }

    @GrpcMethod('UmsService', 'UpsertAddressForUser')
    async upsertAddressForUser(@Body(ValidationPipe) address: Address){
        this.logger.debug(`address sent is ${JSON.stringify(address)}`);
        let result: boolean = false;
        await this.userService.upsertAddressForUser(address);
    }

    @GrpcMethod('UmsService', 'SignIn')
    async signIn(creds: UserCredentials): Promise<SignInResDto>{
        return await this.userService.signIn(creds);
    }

    @GrpcMethod('UmsService', 'SetPassword')
    async setPassword(userPasswords: SetPassReqDto): Promise<void>{
        return await this.userService.setPassword(userPasswords);
    }

    /* createCreds(req: CreateCredsReqDto): Promise<void>{
        return;
    } */

}
