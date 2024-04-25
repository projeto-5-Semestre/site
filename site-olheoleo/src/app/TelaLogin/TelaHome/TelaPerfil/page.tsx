import React from 'react'
import Image from 'next/image';
import MudarSenhaAccordion from './Componentes/MudarSenhaAccordion';
import EditarPerfilAccordion from './Componentes/EditarPerfilAccordion';

const TelaPerfil = () => {

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <div className='w-[375px] h-[667px] border border-zinc-900 flex flex-col'>
                <div className='h-1/4 flex items-center justify-start gap-5 pl-10'>
                    <div className='w-[70px] h-[70px] border-2 border-blue-500 rounded-full'>
                        <Image
                            src="/profile-user.png"
                            alt="Descrição da imagem"
                            width={500}
                            height={500}
                        />
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='text-3xl font-bold'>Maria</h1>
                        <h3 className='text-sm'>maria@gmail.com</h3>
                    </div>
                </div>


                <div className='mt-2 flex flex-col items-center justify-center px-5 gap-2'>
                    <EditarPerfilAccordion />
                    <MudarSenhaAccordion />
                </div>
            </div>
        </div>
    );
}
export default TelaPerfil;