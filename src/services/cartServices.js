
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';


 export default async function addToCart(cart , productId , setIsLoading){
    setIsLoading(true) ;
  const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/${cart}` , {
   productId
  } ,
 {
   headers :{
     token : localStorage.getItem("token")
   }
 }) ;

 data.status == "success" &&  
 toast.success(data.message, {
   position: "bottom-right",
   autoClose: 2000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light",
   transition: Bounce,
   });
 ;
 setIsLoading(false) ;

 console.log(data);
 
}