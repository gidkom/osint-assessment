import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { SharedModule } from './shared.module';

@Module({
    imports: [CommandModule, SharedModule],
    providers: [],
    exports: [],
})
export class SeedsModule {}
