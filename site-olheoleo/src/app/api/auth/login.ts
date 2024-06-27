import axios from "axios";
import { LoginResponse } from "@/auth"

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const url = 'http://localhost:3000/usuarios';
  try {
    const response = await axios.get(url, {
      params: {
        email,
        password
      }
    });

    const users = response.data;
    const user = users.find((user: any) => user.email === email && user.password === password);

    if (user) {
      return { success: true, user };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error during login', error);
    return { success: false };
  }
};
