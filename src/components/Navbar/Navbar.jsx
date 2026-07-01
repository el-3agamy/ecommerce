import React, { useContext } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@heroui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';

const menuItems = [
  {
    name: 'Home',
    path: '/',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    name: 'Categories',
    path: '/categories',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    name: 'Brands',
    path: '/brands',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L9.568 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
      </svg>
    ),
  },
  {
    name: 'Wishlist',
    path: '/wishlist',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    name: 'Cart',
    path: '/cart',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
    ),
  },
];

// Shared helper so the same className logic isn't written twice
const navLinkClass = ({ isActive }) =>
  `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${isActive
    ? 'bg-green-50 text-green-600 shadow-sm shadow-green-100/50'
    : 'text-slate-600 hover:text-green-600 hover:bg-slate-50'
  }`;

const navLinkClassFull = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold w-full transition-all duration-200 ${isActive
    ? 'bg-green-50 text-green-600'
    : 'text-slate-600 hover:text-green-600 hover:bg-slate-50'
  }`;

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/register');
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      shouldHideOnScroll
      className="bg-white/95 backdrop-blur-md border-b border-slate-100"
      classNames={{
        wrapper: 'max-w-7xl px-4 sm:px-6 lg:px-8',
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-slate-600"
        />
        <NavbarBrand>
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-slate-800">Fresh</span>
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Cart</span>
            </span>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-2" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <NavLink className={navLinkClass} to={item.path} end={item.path === '/'}>
              <span className="text-slate-400 group-hover:text-green-500 transition-colors">
                {item.icon}
              </span>
              {item.name}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {isLoggedIn ? (
          <NavbarItem>
            <Button
              onPress={logout}
              className="text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 border border-red-100 font-semibold px-4 rounded-xl transition-all duration-200 text-sm"
              variant="flat"
            >
              Log Out
            </Button>
          </NavbarItem>
        ) : (
          <div className="flex items-center gap-1.5">
            <NavbarItem className="flex">
              <NavLink
                to="/login"
                className="text-sm font-semibold text-slate-600 hover:text-green-600 transition-colors py-2 px-3 hover:bg-slate-50 rounded-lg"
              >
                Login
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                to="/register"
                className="inline-flex items-center justify-center py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-bold rounded-xl shadow-sm hover:shadow transition-all duration-200"
              >
                Register
              </NavLink>
            </NavbarItem>
          </div>
        )}
      </NavbarContent>

      {isLoggedIn && (
        <NavbarMenu className="pt-6 px-6 bg-white/98 backdrop-blur-lg">
          {menuItems.map((item, index) => (
            <NavbarMenuItem onClick={() => setIsMenuOpen(false)} key={`${item.name}-${index}`}>
              <NavLink className={navLinkClassFull} to={item.path} end={item.path === '/'}>
                <span className="text-slate-400">
                  {item.icon}
                </span>
                {item.name}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
  );
}
