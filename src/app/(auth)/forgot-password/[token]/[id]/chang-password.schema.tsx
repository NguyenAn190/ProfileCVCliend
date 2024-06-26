import * as Yup from 'yup';

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Mật khẩu là bắt buộc'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Mật khẩu nhập lại không khớp')
    .required('Nhập lại mật khẩu là bắt buộc'),
});

export default ChangePasswordSchema;
