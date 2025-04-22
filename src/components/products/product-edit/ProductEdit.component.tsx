import React, {useRef, useState} from 'react';
import {message, Modal} from 'antd';
import {Form, Input, InputNumber} from 'formik-antd';
import {Product} from '../../../domain/interfaces/Product';
import ImagePreview from '../../image-preview/ImagePreview.component';
import {saveProduct} from '../../../data/rest/product.service';
import {v4 as uuid} from 'uuid';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import * as Yup from 'yup';

interface Props {
  isOpen: boolean;
  setIsOpenEdit: (value: boolean) => void;
  setSuccess: (value: boolean) => void;
  product?: Product;
}

const ProductEdit = ({isOpen, setIsOpenEdit, product, setSuccess}: Props) => {
  const [image, setImage] = useState(product?.image || '');
  const ref = useRef<FormikProps<Partial<Product>>>(null);

  const onSubmit = async (values: Partial<Product>, formikHelpers: FormikHelpers<Partial<Product>>) => {
    try {
      if (product) {
        values.id = product.id;
        values.image = image ? image : product.image;
        await saveProduct(values);
        message.success('Producto editado con éxito');
        setIsOpenEdit(false);
      } else {
        values.id = uuid();
        await saveProduct(values);
        message.success('Producto guardadp con éxito');
        setIsOpenEdit(false);
      }
      setSuccess(true);
    } catch (e) {
      message.error('No se pudo editar el producto');
      setSuccess(false);
    }
  }

  const handleOk = () => {
    ref.current?.submitForm();
  };

  const handleCancel = () => {
    setIsOpenEdit(false);
    ref.current?.resetForm();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  }

  const validationSchema = Yup.object<Partial<Product>>().shape(
    {
      name: Yup.string().required("Name is required"),
      unitPrice: Yup.number().required("Unit price is required").min(1),
      quantity: Yup.number().required("Quantity is required").min(1),
      image: Yup.string().notRequired(),
    }
  );


  return (
    <Modal title={`${product ? "Editar producto" : "Agregar producto"}`} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
      <Formik<Partial<Product>>
        innerRef={ref}
        initialValues={{
          ...product,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form >
          <Form.Item
            label="Nombre del producto"
            name="name"
          >
            <Input name="name"/>
          </Form.Item>
          <Form.Item
            label="Precio del producto"
            name="unitPrice">
              <InputNumber name="unitPrice"/>
          </Form.Item>
          <Form.Item
            label="Cantidad del producto"
            name="quantity">
              <InputNumber name="quantity"/>
          </Form.Item>
          <Form.Item
            label="Imagen del producto"
            name="image">
              <Input name="image" onChange={handleChange}/>
          </Form.Item>
          <ImagePreview src={image}/>
        </Form>
      </Formik>
    </Modal>
  );
};

export default ProductEdit;
