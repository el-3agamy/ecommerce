import React, { useState } from 'react';
import { Input, Button } from '@heroui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../../utils/api';
import { useParams } from 'react-router-dom';

export default function Address() {
  const [isLoading, setIsLoading] = useState(false);
  const { cartId } = useParams();

  const validationSchema = Yup.object({
    details: Yup.string().required('Address is required.'),
    phone: Yup.string()
      .required('Phone Number is required.')
      .matches(/^01[0125][0-9]{8}$/, 'Only Egyptian Number.'),
    city: Yup.string().required('City is required.'),
  });

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: { details: '', phone: '', city: '' },
    validationSchema,
    onSubmit: checkOut,
  });

  async function checkOut() {
    setIsLoading(true);
    const { data } = await api.post(
      '/orders/checkout-session/' + cartId,
      { shippingAddress: values },
      { params: { url: 'https://ecommerce-sand-phi.vercel.app' } }
    );
    setIsLoading(false);
    location.href = data?.session.url;
  }

  return (
    <div className="sm:w-3/4 mx-auto">
      <h1 className="text-3xl font-bold my-6 hover:text-green-500">Address Details.</h1>
      <form onSubmit={handleSubmit}>
        <div className="inner py-5 grid md:grid-cols-2 gap-4">
          <Input
            name="details"
            isInvalid={touched.details && errors.details}
            errorMessage={errors.details}
            value={values.details}
            onChange={handleChange}
            onBlur={handleBlur}
            className="md:col-span-2"
            label="Your Address Details"
            type="text"
          />
          <Input
            name="phone"
            isInvalid={touched.phone && errors.phone}
            errorMessage={errors.phone}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="md:col-span-2"
            label="Phone Number"
            type="tel"
          />
          <Input
            name="city"
            isInvalid={touched.city && errors.city}
            errorMessage={errors.city}
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className="md:col-span-2"
            label="City"
            type="text"
          />
          <Button type="submit" isLoading={isLoading} color="primary" className="md:col-span-2">
            Place Orders
          </Button>
        </div>
      </form>
    </div>
  );
}
