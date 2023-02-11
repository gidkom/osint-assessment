import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppSuccessResponse } from './../../shared/response/app-success-reponse';
import { ScrapperService } from './scrapper.service';

@Controller('v1/scrapper')
@ApiTags('Scrapper')
export class ScrapperController {
    constructor(private readonly scrapperService: ScrapperService) { }

    @Get()
    @ApiOperation({ summary: 'Start scrapping task' })
    @ApiResponse({
        status: 200,
        description: 'successful',
    })
    async run(): Promise<AppSuccessResponse> {
        await this.scrapperService.run();

        return new AppSuccessResponse(null, 'Scrapping completed');
    }
}
