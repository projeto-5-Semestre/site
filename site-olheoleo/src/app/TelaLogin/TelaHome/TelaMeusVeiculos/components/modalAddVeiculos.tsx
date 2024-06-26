"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import useVeiculos, { Veiculo } from '@/hooks/useVeiculos';
import Button_AddFoto from './Button_AddFoto';
import { IoCloseCircle } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface VeiculoForm {
  modelo: string;
  imagem: string;
  placa: string;
  quilometragem: string;
  tipo_oleo: string;
  modelo_ultimo_oleo: string;
  filtro_oleo: string;
  filtro_ar: string;
  filtro_combustivel: string;
  filtro_cambio: string;
}

interface Modal_AddVeiculosProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (email: string, veiculo: Veiculo) => void;
}

export default function Modal_AddVeiculos({
  isOpen, onClose, onAdd }: Modal_AddVeiculosProps) {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedImage = localStorage.getItem('selectedImage');
      return storedImage ? storedImage : '/car.jpg';
    }
    return '/car.jpg';
  });

  const formatPlaca = (value: string) => {
    const regex = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
    return regex.test(value);
  };


  const { register, handleSubmit, formState: { errors }, reset } = useForm<VeiculoForm>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedImage', selectedImage);
    }
  }, [selectedImage]);

  const onSubmit: SubmitHandler<VeiculoForm> = async (data) => {
    if (!session?.user?.email || !session?.user) {
      console.log('Dados nao encontrados na sessão');
      return;
    }

    if (!formatPlaca(data.placa)) {
      alert('A placa deve estar no formato MERCOSUL: ABC1D23');
      return;
    }

    try {
      const newVeiculo: Veiculo = {
        id: Date.now().toString(),
        modelo: data.modelo,
        url_imagem: selectedImage,
        quilometragem: data.quilometragem,
        placa: data.placa,
        tipo_oleo: data.tipo_oleo,
        modelo_ultimo_oleo: data.modelo_ultimo_oleo,
        filtro_oleo: data.filtro_oleo,
        filtro_ar: data.filtro_ar,
        filtro_combustivel: data.filtro_combustivel,
        filtro_cambio: data.filtro_cambio,
      };

      await onAdd(session.user.email, newVeiculo);
      onClose();
      reset();
      setSelectedImage('/car.jpg');

      router.push('/TelaLogin/TelaHome/TelaMeusVeiculos')
    } catch (error) {
      console.log('Erro ao adicionar veículo:', error);
    }
  }

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Usuário não autenticado.</div>;
  }

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
                  <span className="flex ml-auto justify-end close cursor-pointer text-txt" onClick={onClose}>
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
                    className={`mt-3 p-2 w-full border ${errors.modelo ? 'border-bord' : 'border-gray-300'} rounded-md text-black`}
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
                   <input
                    type="text"
                    placeholder="Modelo do Último Óleo"
                    {...register('modelo_ultimo_oleo', { required: true })}
                    className={`mt-3 p-2 w-full border ${errors.modelo_ultimo_oleo ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                  />
                  <input
                    type="text"
                    placeholder="Filtro de Óleo"
                    {...register('filtro_oleo', { required: false })}
                    className={`mt-3 p-2 w-full border ${errors.filtro_oleo ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                  />
                  <input
                    type="text"
                    placeholder="Filtro de Ar"
                    {...register('filtro_ar', { required: false })}
                    className={`mt-3 p-2 w-full border ${errors.filtro_ar ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                  />
                  <input
                    type="text"
                    placeholder="Filtro de Combustível"
                    {...register('filtro_combustivel', { required: false })}
                    className={`mt-3 p-2 w-full border ${errors.filtro_combustivel ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
                  />
                  <input
                    type="text"
                    placeholder="Filtro de Câmbio"
                    {...register('filtro_cambio', { required: false })}
                    className={`mt-3 p-2 w-full border ${errors.filtro_cambio ? 'border-red-500' : 'border-gray-300'} rounded-md text-black`}
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
