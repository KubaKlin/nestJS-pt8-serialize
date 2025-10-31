import { Product } from '../../generated/prisma';
import { Expose, Transform } from 'class-transformer';

export class SerializedProductDto implements Product {
  id: number;

  @Transform(({ value: name }) => {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    if (capitalizedName.length > 6) {
      return capitalizedName.substring(0, 6) + '...';
    }
    return capitalizedName;
  })
  name: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.name.length;
  })
  textLength: number;

  price: number;
  isInStock: boolean;
}
