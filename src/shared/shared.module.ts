import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from './services/config.service';

const providers = [ConfigService];

@Global()
@Module({
    providers,
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [...providers, JwtModule],
})
export class SharedModule {}
