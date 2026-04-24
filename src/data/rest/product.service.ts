import {Product} from '../../domain/interfaces/Product';
import {apiClient} from '../../config/axios/axios.config';
import {Category} from '../../domain/interfaces/Category';

export const getProducts = (): Promise<Array<any>> => {
  return new Promise(((resolve, reject) => {
    apiClient.get('products', {
    })
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}

export const saveProduct = (product: Partial<Product>): Promise<Array<any>> => {
  return new Promise(((resolve, reject) => {
    apiClient.post('products', product)
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}

export const deleteProduct = (id: string): Promise<any> => {
  return new Promise(((resolve, reject) => {
    apiClient.delete(`products/${id}`, {
    })
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}

export const getCategories = (): Promise<Category[]> => {
  return new Promise(((resolve, reject) => {
    apiClient.get('categories', {
    })
      .then(((results) => results.data))
      .then(products => resolve(products))
      .catch(e => reject(e))
  }));
}
