"use client"
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import Image from 'next/image';
import Button_AddFoto from './Button_AddFoto';
import { IoCloseCircle } from 'react-icons/io5';
import axios from 'axios';


interface VeiculoForm {
  modelo: string;
  imagem: string;
  placa: string;
  quilometragem: string;
  tipo_oleo: string;
}

interface Modal_AddVeiculosProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function Modal_AddVeiculos({
  isOpen, onClose, onAdd }: Modal_AddVeiculosProps) {
  const url = 'http://localhost:3000/veiculos';

  const [selectedImage, setSelectedImage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedImage = localStorage.getItem('selectedImage');
      return storedImage ? storedImage : '/car.jpg';
    }
    return '/car.jpg';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedImage', selectedImage);
    }
  }, [selectedImage]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<VeiculoForm>();

  const onSubmit: SubmitHandler<VeiculoForm> = async (data) => {
    try {
      await axios.post(url, {
        ...data, url_imagem: selectedImage,
      });
      onAdd();
      onClose();
      reset();
      setSelectedImage('/car.jpg');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-0 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all  pt-0 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="flex items-center text-lg leading-6 font-medium text-gray-900">
                  Adicionar Novo Veículo{' '}
                  <span className="flex ml-auto justify-end close cursor-pointer text-fund" onClick={onClose}>
                    <IoCloseCircle size={28} />
                  </span>
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Image
                    src={selectedImage}
                    alt="Car Illustration"
                    className="animate-flip-once w-[350px] h-[250px] mx-auto mt-3 mb-2 rounded-md"
                    width={400}
                    height={250}
                  />

                  <Button_AddFoto selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                  <input
                    type="text"
                    placeholder="Modelo"
                    {...register('modelo', { required: true })}
                    className={`mt-3 p-2 w-full border ${errors.modelo ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                  />
                  <input
                    type="text"
                    placeholder="Placa"
                    {...register('placa', { required: true })}
                    className={`mt-3 p-2 w-full border ${errors.placa ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                  />
                  <input
                    type="number"
                    placeholder="Quilometragem"
                    {...register('quilometragem', { required: true })}
                    className={`mt-3 p-2 w-full border ${errors.quilometragem ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                  />

                  <input
                    type="text"
                    placeholder="Tipo de Óleo"
                    {...register('tipo_oleo', { required: true })}
                    className={`mt-3 p-2 w-full border ${errors.tipo_oleo ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                  />
                  <button
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                    className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    Adicionar Veículo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
