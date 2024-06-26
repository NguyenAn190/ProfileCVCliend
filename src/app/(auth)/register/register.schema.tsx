import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  fullname: Yup.string().required('Họ tên không được bỏ trống'),
  email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
  password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu không được bỏ trống'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Mật khẩu nhập lại không khớp')
    .required('Nhập lại mật khẩu không được bỏ trống'),
});

export default RegisterSchema;
