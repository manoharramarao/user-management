import { Catch, RpcExceptionFilter, ArgumentsHost, Logger, BadRequestException, BadGatewayException, ForbiddenException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { error } from 'console';

// @Catch()
// export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {

//   // private readonly logger: LoggerService = new LoggerService(GrpcExceptionFilter.name);
//   private readonly logger = new Logger('GrpcExceptionFilter');

//   catch(exception: RpcException, host: ArgumentsHost): Observable<any> {

//     const err = exception.getError();
//     this.logger.debug(`Inside GrpcExceptionFilter`);
//     this.logger.error(JSON.stringify(exception.getError()), exception.stack);
//     // If an unfamiliar error occurs / not a business error
//    /*  if (Object.values(BusinessErrors).includes(err.toString()) == false) {
//       this.logger.error(JSON.stringify(exception.getError()), exception.stack);
//     } */
//     return throwError(exception.getError());
//   }
// }

@Catch()
export class GlobalRpcExceptionsFilter extends BaseRpcExceptionFilter {

  private readonly logger = new Logger(GlobalRpcExceptionsFilter.name);
  
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    this.logger.debug(`Inside ${GlobalRpcExceptionsFilter.name}`);
    this.logger.error(exception, exception.stack);
    // this.logger.debug(host);
    // Below line will return only the message.
    // return throwError(new RpcException(exception.response.message[0]));
    
    // Below line will return entire object in JSON string
    return throwError(new RpcException((JSON.stringify(exception))));
  }
}