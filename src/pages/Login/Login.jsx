import { Input, Button } from '@heroui/react';
import { useFormik } from 'formik';
import useUserAuth from '../../hooks/useUserAuth';

export default function Login() {
  const { submitAuth, isLoading, errorMsg } = useUserAuth('signin', '');

  const { values, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: submitAuth,
  });

  return (
    <div className="sm:w-3/4 mx-auto">
      <h1 className="text-3xl font-bold my-6 hover:text-green-500">Login Now!</h1>
      <form onSubmit={handleSubmit}>
        <div className="inner py-5 grid gap-4">
          <Input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Email"
            type="email"
          />
          <Input
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Password"
            type="password"
          />
          <Button type="submit" isLoading={isLoading} color="primary">
            Login
          </Button>
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        </div>
      </form>
    </div>
  );
}
