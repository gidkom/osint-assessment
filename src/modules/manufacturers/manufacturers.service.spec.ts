import { Test } from '@nestjs/testing';

import { ManufacturersService } from './manufacturers.service';

describe('ManufacturersService', () => {
    let service: ManufacturersService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ManufacturersService],
        }).compile();

        service = module.get<ManufacturersService>(ManufacturersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
