'use client'
import { useEffect, useState} from 'react';
import '../globals.css';




export default function TelaLogin(){
    
    

    return(
        <main className='flex min-h-screen flex-col items-center justify-center bg-white text'>
            <div className="bg-white border-slate-100 dark:bg-slate-500 dark:border-slate-500 border-b rounded-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8" >
                <div className="flex min-h-full flex-col justify-center px-6  lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Bem-vindo</h2>
                    <p className="mt-3 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">To the future of transportation </p>
                    </div>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label form="email" className="block text-sm font-bold leading-6 text-gray-900">Endereço de Email</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" placeholder='E-mail'  required className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label form="password" className="block text-sm font-bold  leading-6 text-gray-900">Senha</label>
                                <div className="text-sm">
                                    <a href="#" className="font-bold text-black">Esqueceu a senha?</a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" placeholder='Sua Senha' autoComplete="current-password" required className="block w-full px-1  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                            </div>
                        </div>
                    </form>    
                </div>
                <p className="mt-10 text-center font-bold  text-black">
                    Registre-se
                </p>
            </div>
        </main>
    )
}

