import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';


export default function Categories() {

  const { data: categories, isLoading } = useFetchData('categories');

  if (isLoading) return <LoadingScreen />;


  return (

    <div>
      <h1 className='text-center my-12 font-serif text-3xl font-bold hover:text-green-500 duration-500'>Categories</h1>
      <div className='grid grid-cols-3 gap-3'>
        {
          categories?.map((category) => (
            <div key={category._id} className='col-span-3 m-auto  md:col-span-1'>
              <img className='w-64 h-64 ' src={category.image} alt={category.name} />
              <h3 className='text-center  font-mono font-bold bg-gray-300 w-64'>{category.name}</h3>
            </div>
          ))
        }

      </div>
    </div>


  )
}
