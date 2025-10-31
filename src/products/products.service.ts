import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ProductDto } from './product.dto';
import { Prisma } from '../../generated/prisma';
import { PrismaError } from '../database/prisma-error.enum';
import { ProductNotFoundException } from './product-not-fount.exception';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(product: ProductDto) {
    return this.prismaService.product.create({
      data: product,
    });
  }

  getAll() {
    return this.prismaService.product.findMany();
  }

  async getById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }

  async delete(id: number) {
    try {
      return await this.prismaService.product.delete({
        where: {
          id,
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ProductNotFoundException(id);
      }
      throw error;
    }
  }

  async update(id: number, product: ProductDto) {
    try {
      return await this.prismaService.product.update({
        data: {
          ...product,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ProductNotFoundException(id);
      }
      throw error;
    }
  }
}
