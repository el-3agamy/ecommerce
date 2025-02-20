import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../contexts/authContext'
import axios from 'axios';
// import { Button } from '@heroui/react';
// //////////////////////////////////////////////



// //////////////////////////////////////////////////////////
export default function Orders() {
  const { userId } = useContext(authContext);
  const [orders, setOrders] = useState([])
  useEffect(() => {
    // if (userId)  // because it's value is falsy value at begaining ("")
      getUserOrders()
  }, []); //userId

  async function getUserOrders() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + userId);
    setOrders(data);


  }
  
  return (
    <div>
      {
        orders.map((singleOrder , index) => {
          return (
            <div key={singleOrder._id} className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
              <div className="flex justify-start item-start space-y-2 flex-col">
                
                
                <h1 className="text-3xl  lg:text-4xl font-semibold leading-7 lg:leading-9 text-green-500">
                  Order #{index + +1}
                </h1>
               
                
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                  {new Date(singleOrder.createdAt).toLocaleDateString()} at {new Date(singleOrder.createdAt).toLocaleTimeString()}
                </p>
              </div>

              <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">
                      Customer’s Cart
                    </p>
                    {singleOrder.cartItems.map((cartItem) => {
                      return (
                        <div key={cartItem._id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                          <div className="pb-4 md:pb-8 w-full md:w-40">
                            <img className="w-full" src={cartItem.product.imageCover} alt={cartItem.product.title} />
                          </div>
                          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                              <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
                                {cartItem.product.title}
                              </h3>
                              <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-sm  leading-none text-gray-800">
                                  <span className="dark:text-gray-400 text-gray-500">Style: Casual. </span> 
                                </p>
                                <p className="text-sm  leading-none text-gray-800">
                                  <span className="dark:text-gray-400 text-gray-500">Size: 2xl </span> 
                                </p>
                                <p className="text-sm  leading-none text-gray-800">
                                  <span className="dark:text-gray-400 text-green-500">Color: green </span> 
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <div>

                              <p className="text-base font-bold mb-2 xl:text-lg leading-6">
                                    Unit Price
                              </p>
                              <p className="text-base text-center xl:text-lg leading-6">
                              <span className="text-red-300 line-through"> $</span>{cartItem.price} 
                              </p>
                             
                              </div>
                              <div>
                                <p className="text-base  font-bold mb-2 xl:text-lg leading-6">
                                      Quantity
                                </p>
                                 <p className="text-base text-center  xl:text-lg leading-6 text-sky-800">{cartItem.count}</p>

                              </div>
                              <div>
                              <p className="text-base font-bold mb-2 xl:text-lg leading-6">
                                      Total Price
                                </p>
                              <p className="text-base text-green-500  text-center xl:text-lg font-semibold leading-6">
                                ${cartItem.price * cartItem.count}
                              </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* start of summary */}
                  <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                      <h3 className="text-xl  font-semibold leading-5 text-gray-800">Summary</h3>
                      <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                        <div className="flex justify-between w-full">
                          <p className="text-base  leading-4 text-gray-800">Subtotal</p>
                          <p className="text-base  leading-4 text-gray-600">${singleOrder.totalOrderPrice}</p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base  leading-4 text-gray-800">Discount</p>
                          <p className="text-base  leading-4 text-red-600 line-through ">30${singleOrder.discount}</p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base  leading-4 text-gray-800">Shipping</p>
                          <p className="text-base  leading-4 text-gray-600">${singleOrder.shippingPrice}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base  font-semibold leading-4 text-gray-800">Total</p>
                        <p className="text-base  font-semibold leading-4 text-green-500">${singleOrder.totalOrderPrice }</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end of summary */}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}



