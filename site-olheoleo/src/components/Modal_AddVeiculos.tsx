/* eslint-disable @next/next/no-img-element */
'use client'
import Image from 'next/image';
import { useState } from 'react'

export default function Modal_AddVeiculos() {
  const [showModal, setShowModal] = useState(false);
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [mileage, setMileage] = useState('');
  const [oilType, setOilType] = useState('');

  const handleAddVehicle = () => {
    // Lógica para adicionar o veículo
    // Aqui você pode enviar os dados para o backend ou realizar outras operações necessárias
    console.log('Adicionando veículo:', { model, plate, mileage, oilType });
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
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <span className="close cursor-pointer" onClick={() => setShowModal(false)}>&times;</span>
                <h2 className="text-lg leading-6 font-medium text-gray-900">Adicionar Novo Veículo</h2>
                <Image src="/car.jpg"
                  alt="Car Illustration"
                  className="w-full h-auto animate-spin-slow"
                  width={500}
                  height={300} />

                <input type="file" accept="image/*" className="mt-3" />
                <input
                  type="text"
                  placeholder="Modelo"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="mt-3 p-2 w-full border border-gray-300 rounded-md text-black"
                />
                <input
                  type="text"
                  placeholder="Placa"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  className="mt-3 p-2 w-full border border-gray-300 rounded-md text-black"
                />
                <input
                  type="number"
                  placeholder="Quilometragem"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="mt-3 p-2 w-full border border-gray-300 rounded-md text-black"
                />
                <input
                  type="text"
                  placeholder="Tipo de Óleo"
                  value={oilType}
                  onChange={(e) => setOilType(e.target.value)}
                  className="mt-3 p-2 w-full border border-gray-300 rounded-md text-black"
                />
                <button onClick={handleAddVehicle} disabled={!model || !plate || !mileage || !oilType} className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Complete Conta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/*
Eu preciso de um modal com os seguintes requisitos: 1. A tela para adição de veículo no cadastro deve apresentar em seu canto superior esquerdo um botão com uma seta apontada para a esquerda. Ao ser selecionado, o usuário deve ser redirecionado para a tela de cadastro do usuário. 2.O cliente que realizou o cadastro no app poderá fazer o cadastro de seu(s) veículo(s), contendo as informações como placa, modelo, quilometragem e tipo de óleo utilizado pela última vez. 3.Na tela para adicionar veículos, o sistema deve exibir o título “Adicionar Seu Carro” no topo.4.O sistema deve exibir uma imagem ilustrativa de um automóvel para visualização rápida ou referência, de acordo com o modelo e tipo de automóvel inserido. 5. Abaixo da imagem ilustrativa do carro, o sistema deve permitir que o usuário faça upload de uma foto do seu próprio carro ao clicar no botão “Upload Foto”. O sistema deve validar o formato e o tamanho da foto inserida. 6.Abaixo do botão de upload, quatro campos em branco devem ser disponibilizados um abaixo do outro para que o usuário possa informar o modelo, a placa, a quilometragem e o tipo de óleo. 7.Abaixo do botão de upload, quatro campos em branco devem ser disponibilizados um abaixo do outro para que o usuário possa informar o modelo, a placa, a quilometragem e o tipo de óleo.Em cada campo, deve haver um texto interno exibindo a informação que deve ser inserida, como “Modelo”, “Placa”, “Quilometragem” e “Óleo”. 8. Abaixo do botão de upload, quatro campos em branco devem ser disponibilizados um abaixo do outro para que o usuário possa informar o modelo, a placa, a quilometragem e o tipo de óleo.   O sistema deve validar se nenhum dos campos estão vazios. 9. Abaixo do botão de upload, quatro campos em branco devem ser disponibilizados um abaixo do outro para que o usuário possa informar o modelo, a placa, a quilometragem e o tipo de óleo. O sistema deve validar se a placa informada está no formato correto. 10. Abaixo do botão de upload, quatro campos em branco devem ser disponibilizados um abaixo do outro para que o usuário possa informar o modelo, a placa, a quilometragem e o tipo de óleo. O sistema deve validar se a quilometragem é um número positivo. Após todos os campos serem preenchidos e validados, o sistema deve habilitar o botão “Complete Conta”, localizado abaixo dos campos. 11. Após todos os campos serem preenchidos e validados, o sistema deve habilitar o botão “Complete Conta”, localizado abaixo dos campos. 12. O sistema deve exibir o botão “Pular” ao lado do botão “Complete Conta”. O sistema deve permitir que o usuário pule esta etapa ao clicar no botão “Pular”. 13.O sistema deve exibir o botão “Pular” ao lado do botão “Complete Conta”. O sistema deve redirecionar o usuário para a tela inicial sem adicionar o carro ao seu perfil.
*/
