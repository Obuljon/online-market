import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 100, { message: 'name must be between 5 and 100 characters' })
  name: String;

  @IsNotEmpty()
  @IsString()
  description: String;

  @IsNotEmpty()
  @IsNumber()
  price: Number;

  @IsNotEmpty()
  category: String;

  @IsNotEmpty()
  @IsNumber()
  stock: Number;
}

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  @Length(5, 100, { message: 'name must be between 5 and 100 characters' })
  name: String;

  @IsOptional()
  @IsString()
  @Length(5, 250, {
    message: 'description must be between 5 and 250 characters',
  })
  description: String;

  @IsOptional()
  @IsNumber()
  price: Number;

  @IsOptional()
  @IsString()
  category: String;

  @IsOptional()
  @IsNumber()
  stock: Number;
}
