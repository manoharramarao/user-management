import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from './user.dao';
import { DoesUserExistConstraint } from './validators/userid.validator';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register(
            {
                secret: process.env.JWT_SECRET || jwtConfig.secret,
                signOptions: {
                    expiresIn: jwtConfig.expiresIn
                }
            }
        )
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        UserDao,
        DoesUserExistConstraint
    ],
})
export class UserModule {}
