import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'name is required' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'url is required' })
    @IsUrl({}, { message: 'url is not valid' })
    url: string;
}
