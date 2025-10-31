import { Product } from '../../generated/prisma';
import { Transform } from 'class-transformer';

export class SimpleSerializedProductDto implements Product {
  id: number;

  @Transform(({ value: name }) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  })
  name: string;

  price: number;
  isInStock: boolean;
}
