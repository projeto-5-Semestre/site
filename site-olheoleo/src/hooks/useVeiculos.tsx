/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export type Veiculo = {
  id: string,
  modelo: string,
  url_imagem: string,
  quilometragem: string,
  placa: string,
  tipo_oleo: string,
}

const useVeiculos = (apiUrl: string) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [editedVeiculo, setEditedVeiculo] = useState<Veiculo | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  async function getVeiculos(email: string) {
    try {
      const response = await axios.get(apiUrl);
      const usuarios = response.data.find((usuarios: any) => usuarios.email === email);
      if (usuarios) {
        setVeiculos(usuarios.veiculos);
        setUser(usuarios);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createVeiculo = async (newVeiculo: Veiculo) => {
    try {
      const email = session?.user?.email || '';
      const response = await axios.get(`${apiUrl}?email=${email}`);
      const user = response.data[0];

      if (user && user.veiculos) {
        const updatedVeiculos = [...user.veiculos, newVeiculo];

        await axios.put(`${apiUrl}/${user.id}`, {
          ...user,
          veiculos: updatedVeiculos,
        });

        setVeiculos(updatedVeiculos);
        setUser({ ...user, veiculos: updatedVeiculos });
      }
    } catch (error) {
      console.log('Erro ao criar veículo:', error);
    }
  };

  const deleteVeiculo = async (id: string) => {
    try {
      const email = session?.user?.email || '';
      const response = await axios.get(`${apiUrl}`);
      const user = response.data.find((usuarios: any) => usuarios.email === email);
      if (user) {
        const updatedVeiculos = user.veiculos.filter(
          (veiculo: Veiculo) => veiculo.id !== id
        );
        await axios.put(`${apiUrl}/${user.id}`, {
          ...user,
          veiculos: updatedVeiculos,
        });
        setVeiculos(updatedVeiculos);
        setUser({ ...user, veiculos: updatedVeiculos });
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
      const email = session?.user?.email || '';
      const response = await axios.get(apiUrl);
      const user = response.data.find((usuarios: any) => usuarios.email === email);
      if (user && editedVeiculo) {
        const updatedVeiculos = user.veiculos.map((veiculo: Veiculo) =>
          veiculo.id === editedVeiculo.id ? { ...editedVeiculo } : veiculo
        );
        await axios.put(`${apiUrl}/${user.id}`, {
          ...user,
          veiculos: updatedVeiculos
        });
        setVeiculos(updatedVeiculos);
        setEditedVeiculo(null);
        setIsEditMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Veiculo) => {
    if (editedVeiculo) {
      setEditedVeiculo({
        ...editedVeiculo,
        [field]: e.target.value
      });
    }
  };

  const handleEditVeiculo = (veiculo: Veiculo) => {
    console.log("editanto:", veiculo)
    setEditedVeiculo({ ...veiculo });
    setIsEditMode(true);
  };

  useEffect(() => {
    const email = session?.user?.email || '';
    if (!email) {
      router.push('/TelaLogin')
    } else {
      getVeiculos(email);
    }
  }, [apiUrl, router, session]);


  return {
    veiculos,
    getVeiculos,
    createVeiculo,
    deleteVeiculo,
    handleSaveChanges,
    handleToggleEditMode,
    handleChange,
    handleEditVeiculo,
    editedVeiculo,
    isEditMode,
  };
};

export default useVeiculos;
