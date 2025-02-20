import React from 'react' ;
import { useState } from 'react';
import {Input , Button } from '@heroui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [isLoading , setIsLodaing] = useState(false) ;
  const [errorMsg , setErrorMsg] = useState(null) ;
  const navigate = useNavigate()

  

   function onSubmit (values){
    setErrorMsg(null)
    setIsLodaing(true) ;
   axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
   .then(({data})=>{
    data.message == "success" && navigate("/login") ; 
    console.log(data);
   }).catch((error)=>{
  setErrorMsg(error.response.data.message);
  }).finally(()=>{
    setIsLodaing(false)
  }) ;
     
  };



 const validationSchema = Yup.object({
    name: Yup.string().required("Name is required.").min(3 , "Name must be at least 3 characters .").max(20 , "Maximum length is 20 characters ."),
    email: Yup.string().required("Email is required.").email("Invaild Email !") ,
    password : Yup.string().required('Password is required.').matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/, "Min 8 and max 10 characters, at least one uppercase letter, one number and one special character").min(8 , 'Password must be at least 8 characters') ,
    rePassword : Yup.string().required("RePassword is required.").oneOf([Yup.ref('password')], 'RePassword must equal password') ,
    phone : Yup.string().required("Phone Number is required .").matches(/^01[0125][0-9]{8}$/ , "Only Egyption Number.")
  }) ;

  const {values , handleChange , handleSubmit , errors , touched , handleBlur}= useFormik({
   initialValues:{
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":""
   } ,


   validationSchema ,
   onSubmit 
  })
 

  



  return (
    <div className='sm:w-3/4 mx-auto '>

        <h1 className='text-3xl font-bold my-6 hover:text-green-500 ' >Register Now !</h1>
        <form action="" onSubmit={handleSubmit}>
            <div className="inner py-5 grid md:grid-cols-2 gap-4">
               <Input name='name'  isInvalid={touched.name && errors.name}  errorMessage={errors.name}  value={values.name} onChange={handleChange}  onBlur={handleBlur} className="md:col-span-2" label="Your Name" type="text" variant='' />
               <Input name='email'  isInvalid={touched.email && errors.email}  errorMessage={errors.email}  value={values.email} onChange={handleChange} onBlur={handleBlur}  className="md:col-span-2" label="Email" type="email" variant='' />
               <Input name='password'  isInvalid={touched.password && errors.password}  errorMessage={errors.password}  value={values.password} onChange={handleChange} onBlur={handleBlur}  className="" label="Password" type="password" variant='' />
               <Input name='rePassword'  isInvalid={touched.rePassword && errors.rePassword}  errorMessage={errors.rePassword}  value={values.rePassword}  onChange={handleChange} onBlur={handleBlur} className="" label="RePassword" type="password" variant='' />
               <Input name='phone'  isInvalid={touched.phone && errors.phone}  errorMessage={errors.phone}  value={values.phone} onChange={handleChange}  onBlur={handleBlur} className="md:col-span-2" label="Phone Number" type="tel" variant='' />
               <Button type='submit' isLoading={isLoading}  color="primary" className="md:col-span-2">
                  Register
              </Button>
              {errorMsg && <p className='text-red-500 text-sm'>{errorMsg}</p>}
            </div>
        </form>

    </div>
  )
}
