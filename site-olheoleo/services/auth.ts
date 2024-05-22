import axios from 'axios';

interface User {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
  veiculos: any[]; 
}

interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
  };
}

interface RegisterResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const url = 'http://localhost:3000/usuarios';
  try {
    const response = await axios.get(url, {
      params: {
        email,
        senha: password,
      }
    });

    const users = response.data;
    const user = users.find((user: any) => user.email === email && user.senha === password);

    if (user) {
      return { success: true, user };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error durante o login', error);
    return { success: false };
  }
};


export const register = async (userData: User): Promise<RegisterResponse> => {
  const url = 'http://localhost:3000/usuarios';
  try {
    const response = await axios.post(url, userData);
    return { success: true, user: response.data };
  } catch (error) {
    console.error('Error durante o cadastro:', error);
    return { success: false };
  }
};