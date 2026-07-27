import type { Meta, StoryObj } from '@storybook/react-webpack5';
import ProductsFiltersComponent from '../components/products-filters/ProductsFiltersComponent';
import CollapseComponent from '../components/collapse/Collapse.component';
import {ComponentProps} from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

const mockStore = configureStore({
  reducer: {
    product: (state = {
      products: [
        {unitPrice: 10},
        {unitPrice: 20},
        {unitPrice: 50},
      ],
      page: 0,
      isLastPage: false,
      isFiltering: false,
      isLoading: false,
      totalElements: 0,
    }, action) => state,
    category: (state = {
      categories: [{id: "1", name: 'Groceries'}]
    }) => state,
  }
})

type StoryProps = ComponentProps<typeof ProductsFiltersComponent>;

const meta: Meta<StoryProps> = {
  title: 'Shop/ProductsFilter',
  component: ProductsFiltersComponent,
  subcomponents: { CollapseComponent },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        ProductsFilter: 'A set filters inside a card for filtering products'
      }
    }
  },
  decorators: [(Story) => <Provider store={mockStore}><Story></Story></Provider>],
} satisfies Meta<typeof ProductsFiltersComponent>;

export default meta;
type Story = StoryObj<StoryProps>;
