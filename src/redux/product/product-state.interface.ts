import { Product } from '../../domain/interfaces/Product';
import {Category} from '../../domain/interfaces/Category';

export interface ProductState {
  products: Array<Product>;
  categories: Array<Category>;
}
