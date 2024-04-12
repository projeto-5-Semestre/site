'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Button_AddFoto from './Button_AddFoto';

export default function Modal_AddVeiculos() {
  const [showModal, setShowModal] = useState(false);
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [mileage, setMileage] = useState('');
  const [oilType, setOilType] = useState('');
  const [addClicked, setAddClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState('/car.jpg');

  const handleAddVehicle = () => {
    setAddClicked(true);
    if (!model || !plate || !mileage || !oilType) {
      // Se algum campo estiver vazio, retorna sem fazer nada
      return;
    }

    // Lógica para adicionar o veículo
    console.log('Adicionando veículo:', { model, plate, mileage, oilType });

    // Resetando o estado dos campos e do modal após adicionar o veículo
    setModel('');
    setPlate('');
    setMileage('');
    setOilType('');
    setAddClicked(false);
    setShowModal(false);
  };

  const getBorderColor = (value: string) => {
    if (addClicked && !value) {
      return 'border-red-500';
    }
    if (!addClicked && value) {
      return 'border-green-500';
    }
    return 'border-gray-300';
  };

  return (
    <>
      <div onClick={() => setShowModal(true)}>Adicionar Veículo</div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                <h2 className="text-lg leading-6 font-medium text-gray-900">Adicionar Novo Veículo <span className="flex ml-auto justify-end close cursor-pointer text-fund" onClick={() => setShowModal(false)}>X</span>
                </h2>


                <Image src={selectedImage}
                  alt="Car Illustration"
                  className="w-full h-auto animate-flip-once"
                  width={500}
                  height={300} />

                <Button_AddFoto selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

                <input
                  type="text"
                  placeholder="Modelo"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={`mt-3 p-2 w-full border ${getBorderColor(model)} rounded-md text-black`}
                />
                <input
                  type="text"
                  placeholder="Placa"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  className={`mt-3 p-2 w-full border ${getBorderColor(plate)} rounded-md text-black`}
                />
                <input
                  type="number"
                  placeholder="Quilometragem"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className={`mt-3 p-2 w-full border ${getBorderColor(mileage)} rounded-md text-black`}
                />

                <input
                  type="text"
                  placeholder="Tipo de Óleo"
                  value={oilType}
                  onChange={(e) => setOilType(e.target.value)}
                  className={`mt-3 p-2 w-full border ${getBorderColor(oilType)} rounded-md text-black`}
                />

                <button onClick={handleAddVehicle} className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                  Adicionar Veículo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
