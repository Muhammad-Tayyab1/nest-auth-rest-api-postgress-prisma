import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

//
@ApiTags('Organizations')  // This will create a section in Swagger UI
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create an organization' })
  @ApiResponse({ status: 201, description: 'The organization has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiBody({ type: CreateOrganizationDto })
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({ status: 200, description: 'The found organization.' })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async findOne(@Param('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an organization' })
  @ApiResponse({ status: 200, description: 'The updated organization.' })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  @ApiBody({ type: UpdateOrganizationDto })
  async update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization' })
  @ApiResponse({ status: 200, description: 'Organization deleted.' })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async remove(@Param('id') id: string) {
    return this.organizationService.remove(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Find an organization by userId' })
  @ApiResponse({ status: 200, description: 'Organization found.' })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  async findByUserId(@Param('userId') userId: string) {
    return this.organizationService.findByUserId(userId);
  }
}
