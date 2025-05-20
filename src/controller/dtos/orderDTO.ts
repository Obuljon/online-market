import { IsNotEmpty, IsNumber, Length, Min } from 'class-validator';

export class OrderDTO {
  @IsNotEmpty({ message: "ID bo'sh bo'lmasligi kerak" })
  @Length(24, 24, { message: "ID 24 ta belgidan iborat bo'lishi kerak" })
  _id: string;

  @IsNotEmpty({ message: "Soni bo'sh bo'lmasligi kerak" })
  @IsNumber({}, { message: "Soni raqam bo'lishi kerak" })
  @Min(0, { message: "Soni 0 dan kichik bo'lmasligi kerak" })
  number: number;
}

export interface CartItem {
  _id: string;
  number: number;
}