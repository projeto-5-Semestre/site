'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/modalInfoVeiculos";
import Modal_AddVeiculos from "@/components/modalAddVeiculos";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

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
        <div className="flex justify-start items-start w-screen px-10 py-10 text-txt font-semibold ">
          <h1>SEUS VEÍCULOS</h1>
        </div>
      </header>
      <div className="flex flex-col space-y-4 items-center w-full p-3 m-1 bg-fund">
        {veiculos.map((veiculo) => (
          <div
            key={veiculo.id}
            className="min-w-[80%] max-w-[75%] sm:min-w-[80%] md:w-[35%] md:h-[15%] md:max-w-[65%] items-center grid grid-rows-1 gap-4 bg-grid rounded-lg shadow-sm hover:shadow-md hover:shadow-slate-400/60 cursor-pointer"
            onClick={() => handleOpenModalVeiculo(veiculo)}
          >
            <div className="flex flex-row items-center justify-around mt-3 max-h-[75%] ">
              <div className="flex items-center justify-center font-bold text-txt min-w-[140px] max-w-[155px]">
                <p className="p-3">{veiculo.modelo}</p>
              </div>
              <div>
                <Image
                  className="object-contain rounded-lg min-w-[65%] min-h-[65%] max-h-[65%] max-w-[75%]"
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
            <div className="flex items-center justify-around w-full h-7 mb-4 font-bold text-txt">
              <p>{veiculo.quilometragem} km</p>
              <p>{veiculo.placa}</p>
            </div>
          </div>
        ))}
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
      <button
        onClick={() => setOpenModalAddVeiculo(true)}
        className="fixed bottom-20 right-3 bg-shad text-txt py-3 px-3 rounded-xl"
      >
        <span className="text-txt text-3xl">
          <IoIosAddCircleOutline />
        </span>
      </button>
    </main >
  );
}