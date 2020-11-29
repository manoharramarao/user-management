import { Body, Controller, Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from './model/user.model';
import { UserService } from './user.service';
// import { SignUpValidationPipe } from './pipes/signup-req-validation.pipe';
import { AllRpcExceptionsFilter } from '../utility/filters/rpc-exception.filter';

@Controller('user')
@UseFilters(AllRpcExceptionsFilter)
export class UserController {

    private logger = new Logger(UserController.name);
    constructor(
        private userService: UserService
    ){}

    @GrpcMethod('UmsService', 'SignUp')
    // @UsePipes(new ValidationPipe({ transform: true }))
    async signUp(@Body(ValidationPipe) body: User): Promise<User>{
        // this.logger.debug(body);
        let user = new User();
        user = await this.userService.signUp(body);
        return user;
    }

    /* createCreds(req: CreateCredsReqDto): Promise<void>{
        return;
    } */

}
