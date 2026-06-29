import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Categories from './pages/Categories/Categories';
import Brands from './pages/Brands/Brands';
import Cart from './pages/Cart/Cart';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './contexts/authContext';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import Address from './pages/Address/Address';
import Orders from './pages/Orders/Orders';
import WishList from './pages/WishList/WishList';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Defined outside component so the router is never recreated on re-renders
const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'register', element: <ProtectedRoute requireAuth={false}><Register /></ProtectedRoute> },
      { path: 'login', element: <ProtectedRoute requireAuth={false}><Login /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: '/address/:cartId', element: <ProtectedRoute><Address /></ProtectedRoute> },
      { path: '/ProductDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
