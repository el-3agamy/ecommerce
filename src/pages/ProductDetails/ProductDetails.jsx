import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css" ;
import "slick-carousel/slick/slick-theme.css" ;
import { Button } from '@heroui/react';
import addToCart from '../../services/cartServices';



export default function ProductDetails() {
  const [details, setDetails] = useState(null) ;
  const {id} =useParams() ;
  const [isLoading, setIsLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false 
  }
  

  useEffect( ()=>{
    getProductDetails(id)
  },[])
  async function getProductDetails(productId){
    setIsLoading(true) ;
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`) ;
    setDetails(data.data) ;
    setIsLoading(false) ;

  };

  if (isLoading) {
   return <LoadingScreen />
  }
  return (
    <div> 

    <div className="flex items-center flex-wrap -mx-4">
      {/* Product Images */}
      <div className="w-full md:w-1/3 px-4 mb-8 " >
        
    <Slider {...settings}>
    <img src={details?.imageCover} alt="Product" className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage" />

      {
        details?.images.map((sliderImg )=>{
              return(
                <div>
                  <img src={sliderImg} alt="another_image" />
                </div>
              )
        })
      }
      
    </Slider>
  
      </div>
      {/* Product Details */}
      <div className="w-full md:w-2/3 px-4">
        <h2 className="text-3xl font-bold mb-2">{details?.title}</h2>
        <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
        <div className="mb-4">
         {

          details.priceAfterDiscount ?
         <>
          <span className="text-2xl font-bold mr-2">${details?.priceAfterDiscount}</span>
          <span className="text-gray-500 line-through">${details?.price}</span>
         </> 
          :
          <span className="text-2xl font-bold mr-2">${details?.price}</span>

         }
        </div>
        <div className="flex items-center mb-4">
        {
          [ 1 , 2, 3, 4 , 5].map((star , index)=>{
            return Math.round(details?.ratingsAverage )>= star? <svg aria-hidden="true" key={index} className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
           :
           <svg aria-hidden="true" key={index} className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
         </svg>
          })
        }
          <span className="ml-2 text-gray-600">{details?.ratingsAverage} ({details?.ratingsQuantity}reviews) </span>
        </div>
        <h5 className='my-3'><span className='font-bold'>Category : </span><span className='font-mono'>{details?.category?.name}</span></h5>
        <h5><span className='font-bold'>Brand : </span><span className='font-mono'>{details?.brand?.name}</span></h5>
        <p className="text-gray-700 mb-6 my-3">{details?.description}</p>
        
        
        <div className="flex space-x-4 mb-6">
          <Button isLoading={addLoading} onPress={()=>(addToCart("cart" , details?._id , setAddLoading))} className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            Add to Cart
          </Button>
          <Button isLoading={wishlist} onPress={()=>addToCart("wishlist" , details?._id ,setWishlist )} className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="0" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            Wishlist
          </Button>
        </div>
        
      </div>
  </div>


    </div>
  )
}
