import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('Họ tên là bắt buộc'),
  lastName: Yup.string().required('Họ tên là bắt buộc'),
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Mật khẩu xác nhận phải giống với mật khẩu')
    .required('Mật khẩu xác nhận là bắt buộc'),
});

export default RegisterSchema;
