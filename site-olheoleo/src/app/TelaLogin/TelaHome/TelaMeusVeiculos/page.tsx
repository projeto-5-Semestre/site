/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import Modal_AddVeiculos from "./components/modalAddVeiculos";
import HeaderNavigation from "../../../../components/HeaderNavigation";
import SemVeiculos from "./components/SemVeiculos";
import VeiculoForm from "./components/VeiculoForm";
import useVeiculos, { Veiculo } from "@/hooks/useVeiculos";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

const theme = createTheme({
  palette: {
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});


export default function Main() {
  const { data: session } = useSession();

  const [openModalAddVeiculo, setOpenModalAddVeiculo] = useState(false);
  const [openMais, setOpenMais] = useState(false);

  const { veiculos, deleteVeiculo, handleEditVeiculo, handleSaveChanges, handleToggleEditMode, handleChange, getVeiculos, editedVeiculo, isEditMode } = useVeiculos("http://localhost:3000/usuarios");
  const { createVeiculo } = useVeiculos("http://localhost:3000/usuarios");

  useEffect(() => {
    if (session?.user?.email) {
      getVeiculos(session.user.email);
    }
  }, [session]);

  const handleCloseModalAddVeiculo = () => {
    setOpenModalAddVeiculo(false);
  }
  const handlerOpenMais = () => {
    setOpenMais(true);
  }

  const handleCloseMais = () => {
    setOpenMais(false);
  }

  const handleAddVeiculo = async (email: string, newVeiculo: Veiculo) => {
    try {
      await createVeiculo(email, newVeiculo);
      await getVeiculos(email);
      setOpenModalAddVeiculo(false);
    } catch (error) {
      console.log('Erro ao adicionar veículo', error);
    }
  }


  if (!session?.user?.email) {
    return <p>Carregando...</p>
  }

  if (veiculos.length == 0) {
    return <SemVeiculos />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <main className="flex flex-col w-full h-full bg-fund">
          <HeaderNavigation />
          <div className="flex flex-col space-y-4 justify-center items-center w-screen h-full pb-3 mx-1 mb-8">
            <Slider
              dots={false}
              infinite={false}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              arrows={false}
              className="w-full"
            >
              {veiculos.length > 0 ? (
                veiculos.map((veiculo) => (
                  <div key={veiculo.id}>
                    {/* Dropdown */}
                    <div className="flex justify-end items-center mr-5 mt-2">
                      <div className="relative items-center justify-center">
                        {/* Botão de dropdown */}
                        <img
                          src="/maisIcon.svg"
                          alt="Mais"
                          className="cursor-pointer justify-center items-center"
                          onClick={openMais ? handleCloseMais : handlerOpenMais}
                        />
                        {openMais && (
                          <div className="fixed inset-0 opacity-75 z-40" style={{ backdropFilter: 'blur(5px)', marginTop: '85px' }}></div>
                        )}
                        {/* Conteúdo do dropdown */}
                        {openMais && (
                          <div className="absolute top-20 right-0 w-56 bg-bord rounded-lg shadow-lg z-50">
                            <p
                              className="block px-4 py-2 text-fund cursor-pointer text-center"
                              onClick={() => {
                                setOpenModalAddVeiculo(true);
                                handleCloseMais();
                              }}>
                              Cadastrar um novo veículo
                            </p>
                            <Link href="/TelaLogin/TelaHome/TelaAgendamento">
                              <p
                                className="block px-4 py-2 text-fund cursor-pointer text-center"
                                onClick={() => {
                                  handleCloseMais();
                                }}>
                                Agendar manutenção
                              </p>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <header className="flex min-w-screen justify-center items-center bg-fund ">
                        <div className="flex justify-center items-center w-screen px-5 pt-5 pb-5 text-txt font-semibold ">
                          <h1>Meus Veículos</h1>
                        </div>
                      </header>
                      <div className="absolute w-[180px] h-[150px] bg-shad opacity-100 transform -skew-x-12 bottom-[680px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
                      <div className="inset-0 flex justify-center items-center">
                        <Image
                          className="object-contain max-w-full max-h-full z-20"
                          src={veiculo.url_imagem}
                          width={250}
                          height={250}
                          alt="Carro"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "/sem_img.png";
                          }}
                        />
                      </div>
                      <div className="w-4/5 h-full overflow-hidden rounded-lg justify-center items-center">

                        <div>
                          <VeiculoForm
                            veiculo={veiculo}
                            isEditMode={isEditMode}
                            editedVeiculo={editedVeiculo}
                            handleSaveChanges={handleSaveChanges}
                            handleToggleEditMode={handleToggleEditMode}
                            handleChange={handleChange}
                            deleteVeiculo={() => deleteVeiculo(veiculo.id)}
                            handleEditVeiculo={() => handleEditVeiculo(veiculo)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <SemVeiculos />
              )}
            </Slider>
          </div>
          <Modal_AddVeiculos
            isOpen={openModalAddVeiculo}
            onClose={handleCloseModalAddVeiculo}
            onAdd={
              handleAddVeiculo
            }
          />
        </main >
      </ThemeProvider>
    );
  }
}