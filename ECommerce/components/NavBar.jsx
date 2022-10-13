import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { RiShoppingCart2Line } from 'react-icons/ri'
import logo from '../assets/logo.png';

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

const NavBar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link
          href='/'
        >
          <Image
            src={logo} alt="logo"
            width={50}
            height={50} 
          />
        </Link>
      </p>

      <button 
        type='button' 
        className='cart-icon'
        onClick={() => setShowCart(true)}
      >
        <RiShoppingCart2Line />
        {totalQuantities === 0 ? '' : <span className='cart-item-qty'>{totalQuantities}</span>}
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default NavBar;