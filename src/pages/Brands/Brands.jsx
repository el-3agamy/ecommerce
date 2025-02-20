import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default function Categories() {

  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  } ;
 const {data , isLoading} = useQuery({
    queryKey:['brands'] ,
    queryFn: getCategory ,
    select : (res)=> res.data.data ,
   
  });
  // console.log(data);
  
  return (
    <>
     {
      isLoading ? <LoadingScreen /> :
      <div>
      <h1 className='text-slate-800 text-3xl font-serif font-bold text-center py-14 hover:text-green-400 duration-700'>Brands</h1>
      <div className='grid  md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {
          data?.map((brand)=>{
            return (
              
                <div className='border hover:shadow-green-400 hover:shadow-lg  duration-700 p-2 text-center  flex flex-col items-center justify-center font-serif' key={brand._id}>
                  <img className='' src={brand.image} alt={brand.slug} />
                  <h3>{brand.name}</h3>
                </div>
              
            )
          })
        }
      </div>
    </div>
     }
    
    
    </>
    
  )
}
