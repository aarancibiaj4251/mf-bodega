export interface CreateProductDto {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  image: string;
  categoryId: string;
}
