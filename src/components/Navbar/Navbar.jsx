import React, { useContext } from 'react' ;

import {
  Navbar ,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';


export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "Home",
    "Categories",
    "Brands",
    "Wishlist",
    "Cart", 
    
  ];
  const navigate = useNavigate()
  const {isLoggedIn , setIsLoggedIn} =useContext(authContext) ;

  function logout() {
    setIsLoggedIn(false) ;
    localStorage.removeItem("token") ;
    navigate("/register")

  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} shouldHideOnScroll   isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit hover:text-green-500 "> <i class="fa-solid fa-cart-shopping text-green-500 text-xl align-middle"></i> FreshCart </p>
        </NavbarBrand>
      </NavbarContent>

      { isLoggedIn && <NavbarContent className="hidden sm:flex gap-4" justify="center">
         
      {menuItems.map((item, index)=> (

          <NavbarItem  key={index}>
          <NavLink className={({ isActive }) => 
          isActive 
            ? 'bg-green-500 text-white font-mono font-bold text-xl p-2 rounded-md duration-400' 
            : 'text-black font-mono font-bold text-xl' 
        } color="foreground" to={ item == 'Home' ? '/' : '/'+item.toLocaleLowerCase()}>
            {item}
          </NavLink>
          </NavbarItem>
      ))}
      </NavbarContent> }

      <NavbarContent justify="end">
       {
        isLoggedIn ?
       
      <NavbarItem>
        <Button onPress={logout} color="danger" className='text-black' variant="flat">
            <NavLink >Log Out</NavLink>
        </Button>
      </NavbarItem>

         :
        <>
            <NavbarItem className="flex">
              <NavLink to="/login">Login</NavLink>
            </NavbarItem>
            <NavbarItem>
              <button  className='py-2 px-4 bg-sky-200 rounded-xl hover:bg-sky-400 hover:text-white'>
                  <NavLink to='/register' >Register</NavLink>
              </button>
            </NavbarItem>
        </>
       }
      </NavbarContent>

      { isLoggedIn && <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem onClick={()=> setIsMenuOpen(false)} key={`${item}-${index}`}>
            
            <NavLink className={({ isActive }) => 
          isActive 
            ? 'bg-green-500 text-white font-mono font-bold text-xl p-2 rounded-md duration-400 w-full' 
            : 'text-black font-mono font-bold text-xl w-full' 
        } color="foreground" to={ item == 'Home' ? '/' : '/'+item.toLocaleLowerCase()}>
            {item}
          </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>}
    </Navbar>
  
  )
}
