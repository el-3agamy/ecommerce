import React from 'react'

import { useState } from 'react';
import {Input , Button } from '@heroui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Address() {

  const [isLoading , setIsLodaing] = useState(false) ;
  const {cartId} =useParams()


   async function checkOut() {

    setIsLodaing(true) ;
  
    
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartId ,{
        
          shippingAddress: values
      
      },{
        headers:{
              token : localStorage.getItem("token")
        } ,
          params :{
            
                url :   `https://ecommerce-sand-phi.vercel.app`
          }
        
      }) ;

      //  `http://localhost:5173`
      console.log(data);
      
    setIsLodaing(false) ;
 
      location.href=data?.session.url ;
    
    
      
    }
  

 const validationSchema = Yup.object({
    details: Yup.string().required("Name is required.") ,
   
    phone : Yup.string().required("Phone Number is required .").matches(/^01[0125][0-9]{8}$/ , "Only Egyption Number.") ,
    city: Yup.string().required("City is required.") ,

  }) ;

  const {values , handleChange , handleSubmit , errors , touched , handleBlur}= useFormik({
   initialValues:{
    "details": "",
    "phone":"",
    "city":"",
   } ,


   validationSchema ,
   onSubmit :checkOut
  })
 

  return (
    <div className='sm:w-3/4 mx-auto '>

        <h1 className='text-3xl font-bold my-6 hover:text-green-500 ' >Address Details .</h1>
        <form action="" onSubmit={handleSubmit}>
            <div className="inner py-5 grid md:grid-cols-2 gap-4">
               <Input name='details'  isInvalid={touched.details && errors.details}  errorMessage={errors.details}  value={values.details} onChange={handleChange}  onBlur={handleBlur} className="md:col-span-2" label="Your Address Details" type="text" variant='' />
              
               <Input name='phone'  isInvalid={touched.phone && errors.phone}  errorMessage={errors.phone}  value={values.phone} onChange={handleChange}  onBlur={handleBlur} className="md:col-span-2" label="Phone Number" type="tel" variant='' />

               <Input name='city'  isInvalid={touched.city && errors.city}  errorMessage={errors.city}  value={values.city} onChange={handleChange}  onBlur={handleBlur} className="md:col-span-2" label="City" type="text" variant='' />
               <Button type='submit'  isLoading={isLoading} color="primary" className="md:col-span-2">
                  Place Orders
              </Button>
            </div>
        </form>
    </div>
    
  )
}

