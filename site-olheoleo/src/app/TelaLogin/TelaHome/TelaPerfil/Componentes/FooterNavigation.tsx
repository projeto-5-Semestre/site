import React from 'react';
import Link from 'next/link';

import { MdLocationPin, MdShoppingCart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCar } from "react-icons/io";

const footerNavigation = () => {
    return (

        <>
            <div className='bg-white flex items-center justify-center gap-14 p-4 border-t border-zinc-200'>
                <Link href='/TelaLogin/TelaHome/TelaMeusVeiculos'>
                    <IoMdCar className='text-zinc-400 text-2xl hover:text-emerald-400 cursor-pointer' />
                </Link>

                <Link href='/TelaLogin/TelaHome/TelaAgendamento'>
                    <MdShoppingCart className='text-zinc-400 text-xl hover:text-emerald-400 cursor-pointer' />
                </Link>

                <Link href='/TelaLogin/TelaHome/TelaHistoricoAgendamento'>
                    <MdLocationPin className='text-zinc-400 text-xl hover:text-emerald-400 cursor-pointer' />
                </Link>

                <Link href='/TelaLogin/TelaHome/TelaPerfil'>
                    <FaUserCircle className='text-zinc-400 text-xl hover:text-emerald-400 cursor-pointer' />
                </Link>
            </div>
        </>
    );
}

export default footerNavigation;