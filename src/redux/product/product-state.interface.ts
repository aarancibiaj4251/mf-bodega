import { Product } from '../../domain/interfaces/Product';

export interface ProductState {
  products: Array<Product>;
  page: number;
  isLastPage: boolean;
  isFiltering: boolean;
  isLoading: boolean;
}
