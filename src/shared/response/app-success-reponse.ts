/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AppSuccessResponse {
    @ApiProperty({ type: Boolean })
    status: boolean;

    @ApiPropertyOptional()
    message?: string;

    @ApiPropertyOptional()
    data?: any;

    constructor(data: any, message = '') {
        this.status = true;
        this.message = message;
        this.data = data;
    }
}
