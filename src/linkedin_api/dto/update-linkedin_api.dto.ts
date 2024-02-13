import { PartialType } from '@nestjs/swagger';
import { CreateLinkedinApiDto } from './create-linkedin_api.dto';

export class UpdateLinkedinApiDto extends PartialType(CreateLinkedinApiDto) {}
