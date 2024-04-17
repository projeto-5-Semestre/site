"use client"

import React, {useState} from 'react';
import Image from 'next/image';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import MUISwitch from './Componentes/MUISwitch';
import MudarSenhaAccordion from './Componentes/MudarSenhaAccordion';
import EditarPerfilAccordion from './Componentes/EditarPerfilAccordion';

export default function TelaPerfil() {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: darkMode ? '#90caf9' : '#2196f3',
            },
            secondary: {
                main: darkMode ? '#ff4081' : '#f50057',
            },
            background: {
                default: darkMode ? '#d4d2d2' : '#fff',
                paper: darkMode ? '##ff0505' : '#f5f5f5',
            },
            text: {
                primary: darkMode ? '#fff' : '#000000',
                secondary: darkMode ? '#fff' : '#757575',
            },
        },
    });

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='h-screen flex flex-col items-center justify-center'>
                <div className={`w-[375px] h-[667px] bg-${darkMode ? 'emerald-700' : 'grey-500'} border border-zinc-900 flex flex-col`}>

                    <div className={`h-1/4 bg-${darkMode ? 'zinc-800' : 'grey-500'} flex items-center justify-start gap-5 pl-10`}>
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

                    <div className={`h-[50px] bg-${darkMode ? 'emerald-700' : '#ccc'} border-t border-zinc-400 flex items-center justify-end`}>
                        <div className='w-full pl-5'>
                        </div>
                        <div className='mr-5'>
                            <MUISwitch checked={darkMode} onChange={toggleDarkMode} />
                        </div>
                    </div>

                    <div className='mt-2 flex flex-col items-center justify-center px-5 gap-2'>
                        <EditarPerfilAccordion />
                        <MudarSenhaAccordion />
                    </div>

                    <div className='flex-grow'></div>
                </div>
            </div>
        </ThemeProvider>
    );
}