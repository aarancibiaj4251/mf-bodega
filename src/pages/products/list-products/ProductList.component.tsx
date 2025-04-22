import React, {useEffect, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, message, Popconfirm, Space, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import './ProductList.styles.scss';
import ProductEdit from '../../../components/products/product-edit/ProductEdit.component';
import {Product} from '../../../domain/interfaces/Product';
import {deleteProduct, getProducts} from '../../../data/rest/product.service';
import {useDispatch} from 'react-redux';
import {setProducts} from '../../../redux/product/product.actions';

interface DataType {
  key: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  categoryId: string;
}


const ProductList = () => {
  const dispatch = useDispatch();
  const columns: ColumnsType<DataType> = [
    {
      title: 'Descripcion',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Imagen',
      dataIndex: 'image',
      key: 'image',
      render: src => <img width={80} height={80} src={`${src}`}/>,
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {
            setIsOpenEdit(true);
            setProduct({
              image: record.image,
              quantity: record.quantity,
              name: record.name,
              unitPrice: record.price,
              id: record.key,
              categoryId: record.categoryId
            });
          }}>Editar</a>
          <Popconfirm title="Estas de acuerdo en eliminar el producto" onConfirm={() => handleDelete(record.key)}>
            <a>Eliminar</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>();
  const [product, setProduct] = useState<Product>();
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<Array<DataType>>();

  const getAsyncProducts = async () => {
    const products = await getProducts();
    dispatch(setProducts(products));
    setData(mapperProducts(products));
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      message.success('Producto eliminado con éxito');
      getAsyncProducts();
    } catch (e) {
      message.error('No se puede eliminar el producto que ya esta asociado a una venta');
    }
  }

  const mapperProducts = (products: Array<Product>) => {
    return products.map(x => ({
      key: x.id,
      name: x.name,
      price: x.unitPrice,
      quantity: x.quantity,
      image: x.image,
      categoryId: x.categoryId,
    }));
  }

  useEffect(() => {
    if (success) {
      getAsyncProducts();
      setSuccess(false);
    }
  }, [success]);

  useEffect(() => {
    getAsyncProducts();
  }, []);


  const handleAddProduct = () => {
    setProduct(undefined);
    setIsOpenEdit(true);
  }

  return (
    <div className="products">
      <div className="flex-no-wrap justify-content-between align-items-center">
        <h1>Listado de productos</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
        >
          Agregar
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      {
        isOpenEdit && (
          <ProductEdit
            isOpen={isOpenEdit}
            setIsOpenEdit={setIsOpenEdit}
            product={product}
            setSuccess={setSuccess}
          />
        )
      }
    </div>
  );
};

export default ProductList;
