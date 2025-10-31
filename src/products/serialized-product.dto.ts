import { Product } from '../../generated/prisma';
import { Expose, Transform } from 'class-transformer';

export class SerializedProductDto implements Product {
  id: number;

  @Transform(({ value: name }) => {
    if (name.length > 6) {
      return name.substring(0, 6) + '...';
    }
    return name;
  })
  name: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.name?.length || 0;
  })
  textLength: number;

  price: number;
  isInStock: boolean;
}
