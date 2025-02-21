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
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes';
import ProtectedAuthRoute from './protectedRoutes/ProtectedAuthRoute';
import Address from './pages/Address/Address';
import Orders from './pages/Orders/Orders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import WishList from './pages/WishList/WishList';


import './App.css';

const queryClient = new QueryClient();

function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <MainLayout />, children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "register", element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute> },
        { path: 'login', element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute> },
        { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: "wishlist", element: <ProtectedRoutes><WishList /></ProtectedRoutes> },
        { path: "brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "allorders", element: <ProtectedRoutes><Orders /></ProtectedRoutes> },
        { path: "/address/:cartId", element: <ProtectedRoutes><Address /></ProtectedRoutes> },
        { path: "/ProductDetails/:id", element: <ProtectedRoutes> <ProductDetails /></ProtectedRoutes> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} ></RouterProvider>
          <ToastContainer />
          <ReactQueryDevtools />
        </AuthContextProvider>
      </QueryClientProvider>



    </>
  )
}

export default App
