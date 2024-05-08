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


export type Veiculo = {
  id: string,
  modelo: string,
  url_imagem: string,
  quilometragem: string,
  placa: string,
  tipo_oleo: string,
}

export default function Main() {
  const url = 'http://localhost:3000'
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [editedVeiculo, setEditedVeiculo] = useState<Veiculo | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openModalVeiculo, setOpenModalVeiculo] = useState(false);
  const [openModalAddVeiculo, setOpenModalAddVeiculo] = useState(false);

  useEffect(() => {
    getVeiculos();
  }, []);

  async function getVeiculos() {
    try {
      const response = await axios.get(`${url}/veiculos`);
      setVeiculos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteVeiculo(id: string) {
    try {
      await axios.delete(`${url}/veiculos/${id}`);
      setVeiculos((prevVeiculos) => prevVeiculos.filter((veiculo) => veiculo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = async () => {
    try {
      if (editedVeiculo) {
        await axios.put(`${url}/veiculos/${editedVeiculo.id}`, editedVeiculo);
        await getVeiculos();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Veiculo) => {
    if (editedVeiculo) {
      setEditedVeiculo(prevState => ({
        ...prevState!,
        [field]: e.target.value
      }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <main className="flex flex-col min-w-screen min-h-screen bg-fund">
        <div>
          <HeaderNavigation />
        </div>
        <header className="flex flex-row min-w-screen justify-between bg-fund ">
          <div className="flex justify-center items-center w-screen px-10 py-10 text-txt font-semibold ">
            <h1>Meus Automóveis</h1>
          </div>
        </header>
        <div className="flex flex-col space-y-4 justify-center items-center w-screen p-3 m-1 mb-8">
          <Slider
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            className="w-full"
          >
            {veiculos.map((veiculo) => (
              <div key={veiculo.id} >
                <div className="relative">
                  <div className="absolute w-[180px] h-[140px] bg-shad opacity-100 transform -skew-x-12 z-1 -bottom-3.5 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20">
                    <div className="absolute right-0 top-0 mt-1 mr-1">
                      <button
                        className="text-black cursor-pointer z-40" onClick={() => setOpenModalAddVeiculo(true)}
                      >
                        <Image src="/addBut.svg" alt="Adicionar Veiculo" className="w-10 h-10" width={10} height={10} />
                      </button>
                    </div>
                  </div>
                  <div className="w-4/5 h-64 overflow-hidden rounded-lg justify-center items-center">
                    <div className="absolute inset-0 flex justify-center items-end">
                      <Image
                        className="object-contain max-w-full max-h-full z-40"
                        src={"/teste.png"}
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

                <div className="flex justify-around py-2 ">
                  {isEditMode ? (
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
            ))}
          </Slider>
        </div>
        <Modal_AddVeiculos
          isOpen={openModalAddVeiculo}
          onClose={handleCloseModalAddVeiculo}
          onAdd={getVeiculos}
        />
      </main >
    </ThemeProvider>
  );
}
