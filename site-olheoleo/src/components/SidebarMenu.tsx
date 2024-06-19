/* eslint-disable @next/next/no-img-element */
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { CgProfile } from "react-icons/cg";

export default function SidebarMenu() {
  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  return (
    <div className="fixed top-[60px] left-0 w-full h-full flex flex-col items-start justify-start p-1 bg-fund text-txt">
      <Link href="/">
        <div className="flex items-center border-b border-stone-900 w-screen py-2">
          <img src="/homeIcon.svg" alt="" className="cursor-pointer mr-2" />
          <p>Home</p>
        </div>
      </Link>
      <Link href="/TelaLogin/TelaHome/TelaMeusVeiculos">
        <div className="flex items-center border-b border-stone-900 w-screen py-2">
          <img src="/carIcon.svg" alt="" className="cursor-pointer mr-2" />
          <p>Meus Veículos</p>
        </div>
      </Link>
      <Link href="/TelaLogin/TelaHome/TelaAgendamento">
        <div className="flex items-center border-b border-stone-900 w-screen py-2 ">
          <img src="/calendarioIcon.svg" alt="" className="cursor-pointer mr-2" />
          <p>Agendamento</p>
        </div>
      </Link>
      <Link href="/TelaLogin/TelaHome/TelaPerfil">
        <div className="flex items-center border-b border-stone-900 w-screen py-2">
          <CgProfile className='cursor-pointer mr-2' />
          <p>Perfil</p>
        </div>
      </Link>
      <Link href="/TelaLogin">
        <button onClick={handleLogout} className="flex items-center border-b border-stone-900 w-screen py-2 cursor-pointer">
          <img src="/loginIcon.svg" alt="" className="cursor-pointer mr-2" />
          Sair
        </button>

      </Link>
    </div>
  )
}