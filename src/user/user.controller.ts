import { Body, Controller, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { User } from './model/user.model';
import { UserService } from './user.service';
// import { SignUpValidationPipe } from './pipes/signup-req-validation.pipe';

@Controller('user')
export class UserController {

    private logger = new Logger('UserController');
    constructor(
        private userService: UserService
    ){}

    @GrpcMethod('UmsService', 'SignUp')
    // @UsePipes(new ValidationPipe({ transform: true }))
    async signUp(@Body(ValidationPipe) body: User): Promise<void>{
        // this.logger.debug(body);
        await this.userService.signUp(body);
        return;
    }

}
