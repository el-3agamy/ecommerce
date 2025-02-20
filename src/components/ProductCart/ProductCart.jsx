import { Button } from '@heroui/react';
import React, { useEffect, useState } from 'react';


export default function ProductCart({ productCart, deletSpecificProduct, updateProductCount }) {



  const [loadinRemove, setLoadinRemove] = useState(false);
  const [incrementIsLoading, setIncrementIsLoading] = useState(false);
  const [decrementIsLoading, setDecrementIsLoading] = useState(false);
  const [productCount, setProductCount] = useState(productCart.count);


  useEffect(() => {
    setProductCount(productCart.count)
  }, [productCart.count])



  return (
    <div className="justify-between items-center mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img src={productCart.product.imageCover} alt={productCart.product.title} className="w-full rounded-lg sm:w-40" />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{productCart.product.title}</h2>
          <p className="mt-1 text-xs text-gray-700">Brand : {productCart.product.brand.name}</p>
          <p className="text-sm ">Unit Price : {productCart.price}$</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <Button isLoading={decrementIsLoading} disabled={productCart.count == 1 } disableRipple={productCart.count == 1 } onPress={() => updateProductCount(productCart.product._id,
              productCart.count - 1, setIncrementIsLoading, setDecrementIsLoading, productCount)}
              className="cursor-pointer  bg-gray-100 h-8 min-w-8 rounded-r-none duration-100
               hover:bg-blue-500 hover:text-blue-50 disabled:cursor-not-allowed  disabled:hover:bg-gray-100 disabled:text-black">
              {decrementIsLoading == false && "-"}

            </Button>


            <input className="h-8 w-8 border bg-white text-center 
          text-xs outline-none" type="number" value={productCount}
              onChange={(e) => setProductCount(e.target.value)}
              onBlur={(e) => updateProductCount(productCart.product._id, e.target.value , setIncrementIsLoading,
                setDecrementIsLoading, productCart.count)} min={1} />



            <Button isLoading={incrementIsLoading} onPress={() => updateProductCount(productCart.product._id,
             productCart.count + 1, setIncrementIsLoading, setDecrementIsLoading, productCart.count)}
              className="cursor-pointer  bg-gray-100 h-8 min-w-8 rounded-l-none 
               duration-100 hover:bg-blue-500  hover:text-white">
              {incrementIsLoading == false && "+"}
            </Button>
          </div>
          <div className="flex-col justify-center items-center">
          <p className="text-sm mb-2"><span className='text-green-400'>Total</span> : {(productCart.price) * (productCart.count)}$</p>
            
            <Button isLoading={loadinRemove} onPress={() => deletSpecificProduct(productCart.product._id, setLoadinRemove)} isIconOnly>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
