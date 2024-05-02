'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "./components/modalInfoVeiculos";
import Modal_AddVeiculos from "./components/modalAddVeiculos";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from "@mui/icons-material/Save";

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

  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null);
  const [openModalVeiculo, setOpenModalVeiculo] = useState(false);
  const [openModalAddVeiculo, setOpenModalAddVeiculo] = useState(false);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);


  useEffect(() => {
    getVeiculos();
  }, []);

  async function getVeiculos() {
    try {
      const reponse = await axios.get(`${url}/veiculos`);
      setVeiculos(reponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModalVeiculo = (veiculo: Veiculo) => {
    setSelectedVeiculo(veiculo);
    setOpenModalVeiculo(true);
  };

  const handleCloseModalVeiculo = () => {
    setSelectedVeiculo(null);
    setOpenModalVeiculo(false);
  };

  const handleCloseModalAddVeiculo = () => {
    setOpenModalAddVeiculo(false);
  }

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  async function deleteVeiculo(id: string) {
    try {
      await axios.delete(`${url}/veiculos/${id}`);
      setVeiculos((prevVeiculos) =>
        prevVeiculos.filter((veiculo) => veiculo.id !== id)
      );
      handleCloseModalVeiculo();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`${url}/veiculos/${selectedVeiculo?.id}`,
        selectedVeiculo
      );
      console.log("Alteraçoes salvas: ", response.data);
      await getVeiculos();
      setIsEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSelectedVeiculo((prevSelectedVeiculo) => ({
      ...prevSelectedVeiculo!,
      [name]: value,
    })
    )
  };

  return (
    <main className="flex flex-col min-w-screen min-h-screen bg-fund">
      <header className="flex flex-row min-w-screen justify-between bg-fund ">
        <div className="flex justify-center items-center w-screen px-10 py-10 text-txt font-semibold ">
          <h1>Meus Automóveis</h1>
        </div>
      </header>
      <div className="flex flex-col space-y-4 justify-center items-center w-screen p-3 m-1 mb-8 bg-shad">
        <Slider
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={true}
          className="w-full"
        >
          {veiculos.map((veiculo) => (
            <div
              key={veiculo.id}
              className="flex flex-col justify-center items-center bg-grid rounded-lg shadow-sm hover:shadow-md hover:shadow-slate-400/60 cursor-pointer relative"
            >

              <div className="absolute top-0 right-0 mr-2 mt-2">
                <button
                  onClick={() => setOpenModalAddVeiculo(true)}
                  className="bg-shad text-black py-2 px-2 rounded-xl"
                >
                  <span className="text-txt text-3xl">
                    <IoIosAddCircleOutline />
                  </span>
                </button>
              </div>
              <div className=" flex w-4/5 h-64 overflow-hidden rounded-lg justify-center items-center mb-8 " onClick={() => handleOpenModalVeiculo(veiculo)}>

                <Image
                  className="object-contain w-[40%] h-4/5"
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
              <div className="flex flex-col items-center justify-center w-full p-4">
                <input
                  className="text-txt font-bold text-center border border-gray-300 rounded-md p-1 mb-2 w-full"
                  type="text"
                  value={veiculo.modelo}
                  readOnly
                />
                <input
                  className="text-txt border border-gray-300 rounded-md p-1 mb-2 w-full"
                  type="text"
                  value={`${veiculo.quilometragem} km`}
                  readOnly
                />
                <input
                  className="text-txt border border-gray-300 rounded-md p-1 w-full"
                  type="text"
                  value={veiculo.placa}
                  readOnly
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Modal
        isOpen={openModalVeiculo}
        onClose={handleCloseModalVeiculo}
        image={selectedVeiculo?.url_imagem}
        onSave={handleSaveChanges}
      >
        {selectedVeiculo && (
          <div className="text-center text-txt ">
            <h2>{selectedVeiculo.modelo}</h2>
            <p>
              Quilometragem:
              {isEditMode ? (
                <input
                  type="text"
                  name="quilometragem"
                  className="text-black border border-gray-300 rounded-md p-1"
                  value={selectedVeiculo.quilometragem}
                  onChange={handleChange}
                />
              ) : (
                selectedVeiculo.quilometragem
              )}
            </p>
            <p>
              Placa:
              {isEditMode ? (
                <input
                  type="text"
                  name="placa"
                  className="text-black border border-gray-300 rounded-md p-1"
                  value={selectedVeiculo.placa}
                  onChange={handleChange}
                />
              ) : (
                selectedVeiculo.placa
              )}
            </p>
            <p>
              Tipo de Óleo:
              {isEditMode ? (
                <input
                  type="text"
                  name="tipo_oleo"
                  className="text-black border border-gray-300 rounded-md p-1"
                  value={selectedVeiculo.tipo_oleo}
                  onChange={handleChange}
                />
              ) : (
                selectedVeiculo.tipo_oleo
              )}
            </p>
            <div className="flex justify-around py-2 ">
              {isEditMode ? (
                <div className="flex justify-around py-2">
                  <Button onClick={handleSaveChanges} variant="contained" endIcon={<SaveIcon />}>
                    Salvar
                  </Button>
                  <div className="ml-1">
                    <Button onClick={handleToggleEditMode} variant="contained">
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={handleToggleEditMode} variant="contained" endIcon={<EditIcon />}>
                  Editar
                </Button>
              )}
              <div>
                <Button onClick={() => deleteVeiculo(selectedVeiculo.id)} variant="contained" color="error" startIcon={<DeleteIcon />}>
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal_AddVeiculos
        isOpen={openModalAddVeiculo}
        onClose={handleCloseModalAddVeiculo}
        onAdd={getVeiculos}
      />

    </main >
  );
}