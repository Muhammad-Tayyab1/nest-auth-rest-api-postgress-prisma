import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Organization } from '@prisma/client';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class OrganizationService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateOrganizationDto): Promise<Organization> {
        const existingOrganization = await this.prisma.organization.findUnique({
            where: { name: data.name },
        });

        if (existingOrganization) {
            throw new ConflictException('An organization with this name already exists');
        }

        try {
            return await this.prisma.organization.create({
                data,
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Unique constraint failed on the fields: `name`');
            }
            throw error;
        }
    }
    async findAll(): Promise<Organization[]> {
        try {
            return this.prisma.organization.findMany({
                include: { user: true }, // Include user data if needed
            });
        } catch (error) {
            throw error;
        }
      
    }

    async findOne(id: string): Promise<Organization> {
        try {
            let organization = this.prisma.organization.findUnique({ where: { id }, include: { user: true } });
            if (organization) {
                return organization
            } else {
                throw new NotFoundException('Organization not found!')
            }
        } catch (error) {
            throw error;
        }

    }

    async update(id: string, data: UpdateOrganizationDto): Promise<Organization> {
        try {

            let organization = await this.findOne(id)
            if (organization) {
                return this.prisma.organization.update({ where: { id }, data });
            }

        } catch (error) {
            throw error;
        }

    }

    async remove(id: string): Promise<Organization> {
        try {

            let organization = await this.findOne(id)
            if (organization) {
                return this.prisma.organization.delete({ where: { id } });
            }
        } catch (error) {
            throw error;
        }

    }


async findByUserId(userId: string): Promise<Organization[]> {
    try {
        const organization = await this.prisma.organization.findMany({
            where: { userId },
            include: { user: true },
        });

        // Check if the organization exists
        if (organization) {
            return organization;
        } else {
            throw new NotFoundException('Organization not found for this user!');
        }
    } catch (error) {
        throw error;
    }
}
}

