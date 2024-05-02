import axios from "axios";

export async function deleteVeiculo(id: string) {
  const url = 'http://localhost:3000';
  try {
    await axios.delete(`${url}/veiculos/${id}`);
  } catch (error) {
    console.log(error);
  }
}