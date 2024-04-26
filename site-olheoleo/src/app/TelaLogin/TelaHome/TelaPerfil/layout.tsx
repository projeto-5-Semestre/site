import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import "../../../../app/globals.css";

import FooterNavigation from './Componentes/FooterNavigation';

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                {props.children}
                <div className='w-[372px] absolute right-[773px] bottom-[144px]'>
                    <FooterNavigation/>
                </div>
            </body>
        </html>
    );
}