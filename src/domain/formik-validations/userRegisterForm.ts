import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .min(5)
    .required('Email is required'),
  username: yup
    .string()
    .min(5)
    .required('Username is required'),
  firstName: yup
    .string()
    .min(5)
    .required('First name is required'),
  lastName: yup
    .string()
    .min(5)
    .required('Last name is required'),
});
