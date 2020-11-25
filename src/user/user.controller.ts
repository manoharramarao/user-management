import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('user')
export class UserController {

    private logger = new Logger('UserController');

    @GrpcMethod('UmsService', 'SignUp')
    signUp(): Promise<void>{
        this.logger.debug(`Inside signUp`);
        return;
    }

}
