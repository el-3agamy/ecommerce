import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default function Categories() {

  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  };
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategory,
    select: (data) => data.data.data,

  });


  return (
    <>
      {
        isLoading ? <LoadingScreen /> :
          <div>
            <h1 className='text-center my-12 font-serif text-3xl font-bold hover:text-green-500 duration-500'>Categories</h1>
            <div className='grid grid-cols-3 gap-3'>
              {
                data?.map((category) => {
                  return (

                    <div key={category._id} className='col-span-3 m-auto  md:col-span-1'>
                      <img className='w-64 h-64 ' src={category.image} alt={category.name} />
                      <h3 className='text-center  font-mono font-bold bg-gray-300 w-64'>{category.name}</h3>
                    </div>

                  );
                }


                )
              }

            </div>
          </div>
      }


    </>

  )
}
