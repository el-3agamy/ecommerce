import api from '../utils/api';
import { Bounce, toast } from 'react-toastify';

export default async function addToCart(endpoint, productId, setIsLoading) {
  setIsLoading(true);
  try {
    const { data } = await api.post(`/${endpoint}`, { productId });
    if (data.status === 'success') {
      toast.success(data.message, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        transition: Bounce,
      });
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
  } finally {
    setIsLoading(false);
  }
}

