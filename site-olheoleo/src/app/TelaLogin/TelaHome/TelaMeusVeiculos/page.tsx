/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal_AddVeiculos from "./components/modalAddVeiculos";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from "@mui/icons-material/Save";
import HeaderNavigation from "./components/HeaderNavigation";
import SemVeiculos from "./components/SemVeiculos";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from "next/link";
import { useRouter } from "next/navigation";


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


export type Veiculo = {
  id: string,
  modelo: string,
  url_imagem: string,
  quilometragem: string,
  placa: string,
  tipo_oleo: string,
}

export default function Main() {
  const router = useRouter();
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const url = 'http://localhost:3000/usuarios';
  const [openModalAddVeiculo, setOpenModalAddVeiculo] = useState(false);
  const [editedVeiculo, setEditedVeiculo] = useState<Veiculo | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openMais, setOpenMais] = useState(false);

  async function getVeiculos(email: string) {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      const usuarios = response.data.find((usuarios: any) => usuarios.email === email);
      if (usuarios) {
        setVeiculos(usuarios.veiculos);
        setUser(usuarios);
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVeiculo = async (id: string) => {
    try {
      const email = localStorage.getItem("userEmail") || "";
      const response = await axios.get(`${url}`);
      const user = response.data.find((usuarios: any) => usuarios.email === email);
      if (user) {
        const updatedVeiculos = user.veiculos.filter(
          (veiculo: Veiculo) => veiculo.id!== id
        );
        await axios.put(`${url}/${user.id}`, {
         ...user,
          veiculos: updatedVeiculos,
        });
        setVeiculos(updatedVeiculos);
        setUser({...user, veiculos: updatedVeiculos });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = async () => {
    try {
      const email = localStorage.getItem('userEmail') || '';
      const response = await axios.get(url);
      const user = response.data.find((usuarios: any) => usuarios.email === email);
      if (user && editedVeiculo) {
        const updatedVeiculos = user.veiculos.map((veiculo: Veiculo) =>
          veiculo.id === editedVeiculo.id ? editedVeiculo : veiculo
        );
        await axios.put(`${url}/${user.id}`, { ...user, veiculos: updatedVeiculos });
        await getVeiculos(email);
        setIsEditMode(false);
        setEditedVeiculo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditVeiculo = (veiculo: Veiculo) => {
    setEditedVeiculo({ ...veiculo });
    setIsEditMode(true);
  };

  const handleCloseModalAddVeiculo = () => {
    setOpenModalAddVeiculo(false);
  }
  const handlerOpenMais = () => {
    setOpenMais(true);
  }

  const handleCloseMais = () => {
    setOpenMais(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Veiculo) => {
    if (editedVeiculo) {
      setEditedVeiculo(prevState => ({
        ...prevState!,
        [field]: e.target.value
      }));
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("userEmail"); 
    if (!email) {
      router.push('/TelaLogin')
    } else {
      axios.get(`${url}?email=${email}`)
      .then((response) => {
        if (response.data.length > 0) {
          setVeiculos(response.data[0].veiculos);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar veiculos: ', error );
      })
    }
  }, [router]);

  if (veiculos.length == 0) {
    return (
      <SemVeiculos />
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <main className="flex flex-col w-auto h-auto bg-fund">
          <HeaderNavigation />
          <div className="flex flex-col space-y-4 justify-center items-center w-screen p-3 m-1 mb-8">
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
                    <div className="flex justify-end items-center mr-5 ">
                      <div className="relative items-center justify-center">
                        {/* Botão de dropdown */}
                        <img
                          src="/maisIcon.svg"
                          alt="Mais"
                          className="cursor-pointer justify-center items-center"
                          onClick={openMais ? handleCloseMais : handlerOpenMais}
                        />
                        {openMais && (
                          <div className="fixed inset-0 opacity-50 z-40" style={{ backdropFilter: 'blur(5px)', marginTop: '80px' }}></div>
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
                      <div className="absolute w-[180px] h-[140px] bg-shad opacity-100 transform -skew-x-12 z-1 -bottom-3.5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" />
                      <div className="w-4/5 h-64 overflow-hidden rounded-lg justify-center items-center">
                        <div className="absolute inset-0 flex justify-center items-end">
                          <Image
                            className="object-contain max-w-full max-h-full z-40"
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
                      </div>
                    </div>
                    <form className="flex flex-col justify-start w-full p-4 text-black">
                      <div className="flex flex-col mb-2">
                        <div className="flex flex-col mb-2">
                          <label htmlFor="modelo" className="mb-1">Modelo:</label>
                          {isEditMode ? (
                            <input
                              type="text"
                              id="modelo"
                              name="modelo"
                              className="text-black border border-gray-300 rounded-md p-1"
                              value={editedVeiculo?.modelo}
                              onChange={(e) => handleChange(e, "modelo")}
                            />
                          ) : (
                            <input
                              className="text-txt border border-gray-300 rounded-md p-1 mb-2 w-2/4"
                              type="text"
                              value={`${veiculo.modelo}`}
                              readOnly
                            />
                          )}
                        </div>
                        <div className="flex flex-col mb-2">
                          <label htmlFor="quilometragem" className="mb-1">Quilometragem:</label>
                          {isEditMode ? (
                            <input
                              type="text"
                              id="quilometragem"
                              name="quilometragem"
                              className="text-black border border-gray-300 rounded-md p-1"
                              value={editedVeiculo?.quilometragem}
                              onChange={(e) => handleChange(e, "quilometragem")}
                            />
                          ) : (
                            <input
                              className="text-txt border border-gray-300 rounded-md p-1 mb-2 w-2/4"
                              type="text"
                              value={`${veiculo.quilometragem} km`}
                              readOnly
                            />
                          )}
                        </div>
                        <div className="flex flex-col mb-2">
                          <label htmlFor="placa" className="mb-1">Placa:</label>
                          {isEditMode ? (
                            <input
                              type="text"
                              id="placa"
                              name="placa"
                              className="text-black border border-gray-300 rounded-md p-1"
                              value={editedVeiculo?.placa}
                              onChange={(e) => handleChange(e, "placa")}
                            />
                          ) : (
                            <input
                              className="text-txt border border-gray-300 rounded-md p-1 mb-2 w-2/4"
                              type="text"
                              value={`${veiculo.placa}`}
                              readOnly
                            />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="tipo_oleo" className="mb-1">Tipo de Óleo:</label>
                          {isEditMode ? (
                            <input
                              type="text"
                              id="tipo_oleo"
                              name="tipo_oleo"
                              className="text-black border border-gray-300 rounded-md p-1"
                              value={editedVeiculo?.tipo_oleo}
                              onChange={(e) => handleChange(e, "tipo_oleo")}
                            />
                          ) : (
                            <input
                              className="text-txt border border-gray-300 rounded-md p-1 mb-2 w-2/4"
                              type="text"
                              value={`${veiculo.tipo_oleo}`}
                              readOnly
                            />
                          )}
                        </div>
                      </div>
                    </form>
                    <div className="flex justify-around py-2">
                      {isEditMode && editedVeiculo?.id === veiculo.id ? (
                        <div className="flex justify-around py-2">
                          <Button onClick={handleSaveChanges} variant="contained" endIcon={<SaveIcon />} color='ochre' style={{ color: 'white' }} >
                            Salvar
                          </Button>
                          <div className="ml-1">
                            <Button onClick={handleToggleEditMode} variant="contained" color="ochre" style={{ color: 'white' }}>
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      ) :
                        (
                          <>
                            <div>
                              <Button onClick={() => handleEditVeiculo(veiculo)} variant="contained" color="ochre" style={{ color: 'white' }} >
                                Editar
                              </Button>
                            </div>
                            <div>
                              <div>
                                <Button onClick={() => deleteVeiculo(veiculo.id)} variant="contained" color="error" startIcon={<DeleteIcon />}>
                                  Excluir
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
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
            onAdd={() => {
              const email = localStorage.getItem('userEmail') || '';
              getVeiculos(email);
            }}
          />
        </main >
      </ThemeProvider>
    );
  }
}