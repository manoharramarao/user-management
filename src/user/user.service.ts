import { Inject, Injectable, Logger } from '@nestjs/common';
import { Db } from 'mongodb';
import { User } from './model/user.model';
import { UserDao } from './user.dao';
import { v4 as uuidv4 } from 'uuid';
import { Address } from './model/address.model';
import { UserCredentials } from './dto/sign-in-req.dto';
import { SetPassReqDto } from './dto/set-pass-req.dto';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { SignInResDto } from './dto/sign-in-res.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class UserService {
    private logger = new Logger('UserService');

    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db,
        private userDao: UserDao,
        private jwtService: JwtService
    ){}

    async signUp(body: User): Promise<User> {
        return await this.userDao.create(body);
    }

    async upsertAddressForUser(address: Address): Promise<boolean>{
        return await this.userDao.upsertAddressForUser(address);
    }

    async signIn(creds: UserCredentials): Promise<SignInResDto>{
        let signInRes = new SignInResDto();
        if(await this.isCredsValid(creds)){
            signInRes.accessToken = await this.createAccessToken(creds.username);
            return signInRes;
        }else{
            this.logger.debug(`Creds are invalid`);
            throw new Error(`Creds are invalid`);
        }
    }

    async isCredsValid(creds: UserCredentials): Promise<boolean>{
        let salt = await this.userDao.getSalt(creds.username);
        creds.password = await this.hashPassword(creds.password, salt.salt);
        return await this.userDao.isCredsValid(creds);
    }

    async setPassword(userPasswords: SetPassReqDto): Promise<void>{
        try{
            if(await this.matchPasswords(userPasswords)){
                let salt = await bcrypt.genSalt();
                let password = await this.hashPassword(userPasswords.password, salt);
                await this.userDao.setPassword(userPasswords.username, password, salt);
                return;
            }
        }catch(err){
            this.logger.error(err);
            throw new RpcException(err);
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return await bcrypt.hash(password, salt);
    }

    private async matchPasswords(passwords: SetPassReqDto): Promise<boolean>{
        return await (passwords.password.localeCompare(passwords.confirmPassword) == 0)? true: false;
    }

    private async createAccessToken(username: string, sessionId?: string, sessionStartedAt?: Date){
        const payload: JwtPayloadDto = {username, sessionId, sessionStartedAt};
        return this.jwtService.sign(payload);
    }


}
