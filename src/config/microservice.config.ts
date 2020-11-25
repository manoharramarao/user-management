import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import * as config from 'config';

const url = config.get('url');

export const microserviceOptions: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'ums',
      protoPath: join(__dirname, '../../src/proto/ums.proto'),
      url: url.ums,
    },
  };