import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .min(5)
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});
