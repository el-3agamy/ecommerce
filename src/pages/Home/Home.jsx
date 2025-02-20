import axios from 'axios';
import React, { useEffect , useState } from 'react' ;
import Product from '../../components/Product/Product';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

export default function Home() {
 
  const [products, setProducts] = useState([])
  const [isLoadig, setIsLoading] = useState(true)

  useEffect(()=>{
    getAllProducts()
  } ,[])

 async function getAllProducts(){
  setIsLoading(true)
  const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products") ;
  setProducts(data.data)
  setIsLoading(false)
  


 }

 if (isLoadig) {
  return <LoadingScreen />
 }

  return (
    <>
   
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
    {
      products.map((product )=>{
        return(
                <Product  product={product} key={product._id} />


        )
      })
    }
   </div>
    
    
    </>

  )
}
