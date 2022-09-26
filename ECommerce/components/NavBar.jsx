import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

// import { Cart } from './';
// import { useStateContext} from '../context/StateContext';

const NavBar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link
          href='/'
        >
          M Store
        </Link>
      </p>

      <button 
        type='button' 
        className='cart-icon'
        onClick={''}
      >
        <AiOutlineShopping />
        <span className='cart-item-qty'>1</span>
      </button>
    </div>
  )
}

export default NavBar;