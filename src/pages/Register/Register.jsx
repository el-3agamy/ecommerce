import { Input, Button } from '@heroui/react';
import { useFormik } from 'formik';
import useUserAuth from '../../hooks/useUserAuth';

export default function Register() {
  const { submitAuth, isLoading, errorMsg } = useUserAuth('signup', 'login');

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: submitAuth,
  });

  return (
    <div className="sm:w-3/4 mx-auto">
      <h1 className="text-3xl font-bold my-6 hover:text-green-500">Register Now!</h1>
      <form onSubmit={handleSubmit}>
        <div className="inner py-5 grid md:grid-cols-2 gap-4">
          <Input name="name" isInvalid={touched.name && errors.name} errorMessage={errors.name} value={values.name} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2" label="Your Name" type="text" />
          <Input name="email" isInvalid={touched.email && errors.email} errorMessage={errors.email} value={values.email} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2" label="Email" type="email" />
          <Input name="password" isInvalid={touched.password && errors.password} errorMessage={errors.password} value={values.password} onChange={handleChange} onBlur={handleBlur} label="Password" type="password" />
          <Input name="rePassword" isInvalid={touched.rePassword && errors.rePassword} errorMessage={errors.rePassword} value={values.rePassword} onChange={handleChange} onBlur={handleBlur} label="RePassword" type="password" />
          <Input name="phone" isInvalid={touched.phone && errors.phone} errorMessage={errors.phone} value={values.phone} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2" label="Phone Number" type="tel" />
          <Button type="submit" isLoading={isLoading} color="primary" className="md:col-span-2">
            Register
          </Button>
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        </div>
      </form>
    </div>
  );
}

