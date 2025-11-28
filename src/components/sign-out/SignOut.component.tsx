import './SignOut.component.scss';
import {Button, Form, Input, message} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserRegister } from '../../domain/interfaces/user/User';
import {register} from "../../data/rest/auth/auth.service";

const SignOut = () => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 16 },
  };

  const onFinish = async (userRegister: UserRegister) => {
    try {
      await register({username: userRegister.username});
      form.resetFields();
      message.info(`Se registro el usuario correctamente`);
    } catch (e) {
      message.error(`Error al registrar usuario`);
    }
  };


  return (
    <div className="sign-up">
      <h2 className="title text-center">No tengo una cuenta</h2>
      <span className="text-center" style={{padding: '10px'}}>Registrate aquí</span>
      <Form
        {...layout}
        layout="horizontal"
        style={{
          float: 'left',
        }}
        form={form} onFinish={onFinish}
      >
        <Form.Item wrapperCol={{offset: 1}} label="Usuario" name="username">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{offset: 1}}
                   label="Contraseña" name="password">
          <Input.Password
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          ></Input.Password>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 1}}
                   label="Confirmar contraseña" name="password2">
          <Input.Password
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          ></Input.Password>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 12 }}>
          <Button type="primary" htmlType="submit">
            Registrate
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignOut;
