import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'My Organization', description: 'The name of the organization' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123 Main St', description: 'The address of the organization', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'uuid-of-user', description: 'The ID of the user creating the organization' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
