import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(productID: number) {
    super(`Product with ID ${productID} not found`);
  }
}
