import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { JwtAuthenticationGuard } from '../authentication/jwt-authentication.guard';
import type { RequestWithUser } from '../authentication/request-with-user';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() product: CreateProductDto, @Req() request: RequestWithUser) {
    return this.productsService.create(product);
  }

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.update(id, product);
  }
}
