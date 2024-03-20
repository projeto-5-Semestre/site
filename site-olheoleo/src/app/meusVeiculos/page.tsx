"use client"
import { useEffect, useState } from "react";
import "../globals.css"

import Image from 'next/image';
import Modal from '@/components/Modal'

import sempng from '../../../public/sem.jpg.gif'
import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";

export type Veiculo = {
  modelo: string,
  url_imagem: string,
  quilometragem: string,
  placa: string,
}


export default function Main() {
  const [data, setData] = useState<{ veiculos: Veiculo[] }>({ veiculos: [] });
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch('api/veiculos')
      .then((res) => res.json())
      .then((data) => setData(data.data))
  }, []);

  let handleOpenModal = (veiculo: Veiculo) => {
    setSelectedVeiculo(veiculo);
    setOpenModal(true);
  };

  let handleCloseModal = () => {
    setSelectedVeiculo(null);
    setOpenModal(false);
  };

  return (
    <main className="flex flex-col w-full min-h-screen bg-fund">
      <header className="flex flex-row justify-between w-screen bg-fund">
        <div className="flex justify-start w-full px-20 py-10 text-txt font-semibold ">
          <h1>
            SEUS VEÍCULOS
          </h1>
        </div>
      </header>
      <div className="flex flex-col space-y-4 items-center w-full h-[70%] p-3 m-1 bg-fund">
        {data.veiculos.map((veiculo, index) => (
          <div key={index} className=" w-3/4 items-center grid grid-rows-1 gap-4 bg-grid max-w-screen-md h-[10%] rounded-lg shadow-sm hover:shadow-md hover:shadow-slate-400/60 cursor-pointer" onClick={() => handleOpenModal(veiculo)}>
            <div className="flex flex-row items-center justify-around mt-3">
              <div className="flex items-center justify-center font-bold text-txt">
                <p className="p-5">{veiculo.modelo}</p>
              </div>
              <div className=" max-w-[200px] max-h-[122px]">
                <Image
                  className="object-cover rounded-lg max-w-[200px] max-h-[120px]"
                  src={veiculo.url_imagem || sempng}
                  width={250}
                  height={250}
                  alt="Carro" />
              </div>
            </div>
            <div className="flex items-center justify-around w-full h-7 mb-4 font-bold text-txt">
              <p>{veiculo.quilometragem}</p>
              <p>{veiculo.placa}</p>
            </div>
          </div>
        ))}
        <Modal isOpen={openModal} onClose={handleCloseModal} image={selectedVeiculo?.url_imagem} >
          {
            selectedVeiculo && (
              <div className="text-center">
                <h2>{selectedVeiculo.modelo}</h2>
                <p>Quilometragem: {selectedVeiculo.quilometragem}</p>
                <p>Placa: {selectedVeiculo.placa}</p>
              </div>
            )}
        </Modal>
        <Link href="/addCar">
          <button className="fixed bottom-2 right-3 bg-shad text-txt py-2 px-3 rounded-xl">
            <span className="text-txt text-3xl">
              <IoIosAddCircleOutline />
            </span>
          </button>
        </Link>
      </div>
    </main>
  )
}