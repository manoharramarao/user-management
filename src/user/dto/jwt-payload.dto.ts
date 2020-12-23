export class JwtPayloadDto {
    username: string;
    sessionId?: string;
    sessionStartedAt?: Date;
}