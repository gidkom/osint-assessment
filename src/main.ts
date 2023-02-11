import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { setupSwagger } from './viveo-swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
        cors: true,
    });
    app.enable('trust proxy');
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
                    scriptSrc: ["'self'", "https: 'unsafe-inline'"],
                },
            },
        }),
    );

    app.use(compression());
    app.use(morgan('combined'));

    const reflector = app.get(Reflector);

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            dismissDefaultMessages: true,
            validationError: {
                target: false,
            },
        }),
    );

    const configService = app.select(SharedModule).get(ConfigService);

    void app.startAllMicroservices();

    setupSwagger(app);

    const port = configService.getNumber('PORT');
    await app.listen(port);

    console.info(`server running on port ${port}`);
}
void bootstrap();
