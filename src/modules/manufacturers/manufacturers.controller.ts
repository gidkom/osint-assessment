import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppSuccessResponse } from './../../shared/response/app-success-reponse';
import { CreateDto } from './dtos/create.dto';
import { ManufacturersService } from './manufacturers.service';
import { Manufacturer } from './schema/manufacturer.schema';

@Controller('v1/manufacturers')
@ApiTags('Manufacturers')
export class ManufacturersController {
    constructor(public readonly manufacturersService: ManufacturersService) {}

    @Post()
    @ApiOperation({ summary: 'Add a manufacturer' })
    @ApiResponse({
        status: 200,
        description: 'successful',
        isArray: false,
        type: AppSuccessResponse,
    })
    async create(@Body() createDto: CreateDto): Promise<AppSuccessResponse> {
        await this.manufacturersService.create(createDto);
        return new AppSuccessResponse(null, 'Manufacturer added');
    }

    @Get()
    @ApiOperation({ summary: 'List manufacturers' })
    @ApiResponse({
        status: 200,
        description: 'successful',
        isArray: true,
        type: Manufacturer,
    })
    async listManufacturers(): Promise<Manufacturer[]> {
        return this.manufacturersService.findAll();
    }
}
