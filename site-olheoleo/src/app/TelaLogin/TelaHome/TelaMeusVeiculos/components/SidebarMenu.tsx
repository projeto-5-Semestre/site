/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

export default function SidebarMenu() {
  
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
          <img src="/calendarioIcon.svg" alt="" className="cursor-pointer mr-2"/>
          <p>Agendamento</p>
        </div>
      </Link>
      <Link href="/TelaLogin/TelaHome/TelaPerfil">
        <div className="flex items-center border-b border-stone-900 w-screen py-2">
          <img src="/loginIcon.svg" alt="" className="cursor-pointer mr-2" />
          <p>Login</p>
        </div>
      </Link>
    </div>
  )
}