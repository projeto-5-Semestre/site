'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import Modal_AddVeiculos from "@/components/Modal_AddVeiculos";
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
  const [openModalVeiculos, setOpenModalVeiculos] = useState(false);
  const [openModalAddVeiculo, setOpenModalAddVeiculo] = useState(false);

  useEffect(() => {
    fetch("../../../api/veiculos")
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  useEffect(() => {
    if (openModalVeiculos || openModalAddVeiculo) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [openModalVeiculos, openModalAddVeiculo]);

  let handleOpenModalVeiculos = (veiculo: Veiculo) => {
    setSelectedVeiculo(veiculo);
    setOpenModalVeiculos(true);
  };

  let handleCloseModalVeiculos = () => {
    setSelectedVeiculo(null);
    setOpenModalVeiculos(false);
  };

  let handleCloseModalAddVeiculo = () => {
    setOpenModalAddVeiculo(false);
  };

  return (
    <main className="flex flex-col min-w-screen min-h-screen bg-fund">
      <header className="flex flex-row min-w-screen justify-between bg-fund ">
        <div className="flex justify-start items-start w-screen px-10 py-10 text-txt font-semibold ">
          <h1>SEUS VEÍCULOS</h1>
        </div>
      </header>
      <div className="flex flex-col space-y-4 items-center w-full p-3 m-1 bg-fund">
        {data && data.veiculos && data.veiculos.map((veiculo, index) => (
          <div
            key={index}
            className="min-w-[80%] max-w-[75%] sm:min-w-[80%] md:w-[35%] md:h-[15%] md:max-w-[65%] items-center grid grid-rows-1 gap-4 bg-grid rounded-lg shadow-sm hover:shadow-md hover:shadow-slate-400/60 cursor-pointer"
            onClick={() => handleOpenModalVeiculos(veiculo)}
          >
            <div className="flex flex-row items-center justify-around mt-3 max-h-[75%] ">
              <div className="flex items-center justify-center font-bold text-txt min-w-[140px] max-w-[155px]">
                <p className="p-3">{veiculo.modelo}</p>
              </div>
              <div className="">
                <Image
                  className="object-contain rounded-lg min-w-[65%] min-h-[65%] max-h-[65%] max-w-[75%]"
                  src={veiculo.url_imagem || "/sem.jpg.gif"}
                  width={250}
                  height={250}
                  alt="Carro"
                />
              </div>
            </div>
            <div className="flex items-center justify-around w-full h-7 mb-4 font-bold text-txt">
              <p>{veiculo.quilometragem}</p>
              <p>{veiculo.placa}</p>
            </div>
          </div>
        ))}
        {openModalVeiculos && (
          <div className="fixed inset-0 backdrop-blur-sm pointer-events-none z-10"> </div>
        )}
        <Modal isOpen={openModalVeiculos} onClose={handleCloseModalVeiculos} image={selectedVeiculo?.url_imagem} >
          {
            selectedVeiculo && (
              <div className="text-center text-txt">
                <h2>{selectedVeiculo.modelo}</h2>
                <p>Quilometragem: {selectedVeiculo.quilometragem}</p>
                <p>Placa: {selectedVeiculo.placa}</p>
              </div>
            )}
        </Modal>
        <Modal_AddVeiculos isOpen={openModalAddVeiculo} onClose={handleCloseModalAddVeiculo} />
        <button
          onClick={() => setOpenModalAddVeiculo(true)}
          className="fixed bottom-20 right-3 bg-shad text-txt py-3 px-3 rounded-xl"
        >
          <span className="text-txt text-3xl">
            <IoIosAddCircleOutline />
          </span>
        </button>
      </div>
    </main>
  );
}


