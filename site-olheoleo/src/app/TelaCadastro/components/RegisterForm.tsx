"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import UserForm from './UserForm';
import { User } from "../../../../services/auth"
import { register, RegisterResponse } from '@/auth';

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (userData: User) => {
    setError(null);

    try {
      const response: RegisterResponse = await register(userData);
      
      if (response.success) {
        const result = await signIn('register', {
          email: userData.email,
          password: userData.password,
          redirect: false,
        });

        if (result && result.error) {
          setError('Erro no cadastro. Por favor, tente novamente.');
        } else {
          router.push('/TelaLogin');
        }
      } else {
        setError('Erro no cadastro. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error(error);
      setError('Ocorreu um erro durante o cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <UserForm onSubmit={handleRegister} error={error} isNewUser={true} />
    </div>
  );
};

export default RegisterForm;
