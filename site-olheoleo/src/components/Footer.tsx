import React from 'react';

import { IoCarSharp, IoLocationSharp, IoBagAdd, IoPersonCircleSharp } from "react-icons/io5";


const Footer: React.FC = () => {
  return (
    <footer className="fixed inset-x-0 bottom-0 bg-gray-800 text-white py-6">
      <nav className=''>
        <ul className="flex justify-around">
          <li>
            <a href="/meusVeiculos" className="hover:underline"><IoCarSharp size={22} /></a>
          </li>
          <li>
            <a href="/" className="hover:underline"><IoBagAdd size={20} /></a>
          </li>
          <li>
            <a href="/produtos" className="hover:underline"><IoLocationSharp size={20} /></a>
          </li>
          <li>
            <a href="/perfil" className="hover:underline"><IoPersonCircleSharp size={20} /></a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;