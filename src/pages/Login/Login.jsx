import React, { useContext } from 'react' ;
import { useState } from 'react';
import {Input , Button } from '@heroui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';

export default function Login() {

  const [isLoading , setIsLodaing] = useState(false) ;
  const [errorMsg , setErrorMsg] = useState(null) ;
  const navigate = useNavigate()
 const {setIsLoggedIn} = useContext(authContext) ;
  

   function onSubmit (values){
    setErrorMsg(null)
    setIsLodaing(true) ;
   axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
   .then(({data})=>{
    // data.message == "success" && navigate("/") ; 
    // localStorage.setItem("token" , data.token) ;
    if (data.message == "success") {
      setIsLoggedIn(true)
      navigate("/") ;
      localStorage.setItem("token" , data.token)
    }
   }).catch((error)=>{
  setErrorMsg(error.response.data.message);
  }).finally(()=>{
    setIsLodaing(false)
  }) ;
  
   

  };



 const validationSchema = Yup.object({
    email: Yup.string().required("Email is required.").email("Invaild Email !") ,
    password : Yup.string().required('Password is required.').matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/, "Min 8 and max 10 characters, at least one uppercase letter, one number and one special character").min(8 , 'Password must be at least 8 characters') ,
  }) ;

  const {values , handleChange , handleSubmit , errors , touched , handleBlur}= useFormik({
   initialValues:{
    "email":"",
    "password":"",
   } ,


   validationSchema ,
   onSubmit 
  })
 

  



  return (
    <div className='sm:w-3/4 mx-auto '>

        <h1 className='text-3xl font-bold my-6 hover:text-green-500' >Login Now !</h1>
        <form action="" onSubmit={handleSubmit}>
            <div className="inner py-5 grid  gap-4">
               <Input name='email'  isInvalid={touched.email && errors.email}  errorMessage={errors.email}  value={values.email} onChange={handleChange} onBlur={handleBlur}   label="Email" type="email" variant='' />
               <Input name='password'  isInvalid={touched.password && errors.password}  errorMessage={errors.password}  value={values.password} onChange={handleChange} onBlur={handleBlur}   label="Password" type="password" variant='' />
               <Button type='submit' isLoading={isLoading}  color="primary" >
                  Login
              </Button>
              {errorMsg && <p className='text-red-500 text-sm'>{errorMsg}</p>}
            </div>
        </form>

    </div>
  )
}
