import type { Meta, StoryObj } from '@storybook/react-webpack5';
import CartItemComponent from '../components/cart-item/CartItem.component';

const meta = {
  title: 'Shop/CartItem',
  component: CartItemComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof CartItemComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    count: 1,
    image: 'https://cdn.pixabay.com/photo/2016/03/27/21/37/tea-1284366_1440_2560.jpg',
    unitPrice: 21,
    name: 'Test product',
  },
  argTypes: {
    count: { control: 'range', min: 1, max: 30 },
    unitPrice: { control: 'number'},
  },
  render: ({ count, image, unitPrice, name }) => (
    <CartItemComponent
      cartItem={{
        count,
        product: {
          id: '',
          categoryId: '',
          quantity: 30,
          image,
          unitPrice,
          name
        }
      }}
    />
  ),
};
