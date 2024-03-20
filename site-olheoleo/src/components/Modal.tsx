/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from "react";
import { IoCloseCircle } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
  image?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, image }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className=' flex flex-col items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-50 '>
      <div className='bg-slate-700 sm:w-[88%] sm:h-[85%] sm:max-w-[800px] sm:p-4 md:w-[88%] md:h-[80%] md:max-h-[580px] lg:w-[90%] lg:h-[80%] lg:max-w-[1024px] lg:max-h-[1280px] w-[95%] h-[65%] max-w-[480px] max-h-[432px] p-4 rounded-2xl shadow-lg relative' /* dispositivo com 600 de altura tem que corrigir*/>
        <div className='flex items-center justify-center'>
          {
            image && (
              <img
                src={image || '../../public/sem.jpg.gif'}
                alt='Imagem do Veículo'
                className='object-cover rounded-md my-4 sm:h-1/4 sm:w-1/3 md:h-[30%] md:w-1/4 w-2/5 h-1/4 min-w-[115px]'
              />
            )
          }
        </div>

        <div
          className='absolute top-2 right-2 text-shad hover:text-slate-200 cursor-pointer'
          onClick={onClose}
        >
          <IoCloseCircle size={28} />
        </div>
        {children}
      </div>
    </div>
  )
};

export default Modal;