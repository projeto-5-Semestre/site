/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { IoReorderThree, IoCloseSharp } from "react-icons/io5";
import SidebarMenu from './SidebarMenu';

export default function HeaderNavigation() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="w-auto ">
      <div className="bg-txt flex items-center justify-around p-2 border-b border-grid">
        <div className="flex items-center justify-between w-full">
          <div className='cursor-pointer' onClick={toggleMenu}>
            {isOpen ? <IoCloseSharp className="text-5xl text-fund" /> : <IoReorderThree className="text-5xl text-fund" />}
          </div>
          <div className="flex justify-center items-center">
            <img src="/logo.png" alt="Logo" className="w-32 h-10"  />
          </div>
          <div style={{ width: '2.5rem' }} />
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-[60px] left-0 w-full h-full z-10 scroll">
          <SidebarMenu/>
        </div>
      )}
    </main>
  )
}