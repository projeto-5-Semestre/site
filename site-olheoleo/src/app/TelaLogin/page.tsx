'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import HeaderNavigation from './TelaHome/TelaMeusVeiculos/components/HeaderNavigation';
import { login } from '../../../services/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 
    try {
      const result = await login(email, password);
      if (result.success) {
        localStorage.setItem('userEmail', email);
        router.push('/TelaLogin/TelaHome/TelaMeusVeiculos');
      } else {
        setError('Credenciais inválidas. Por favor, tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro durante o login. Por favor, tente novamente.');
    }
  };

  return (
    <div className="flex flex-col h-dvh bg-gray-100">
      <HeaderNavigation />
      <div className="flex-grow flex items-center justify-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="flex justify-center text-txt border-b text-2xl font-bold mb-2">Faça seu Login</h2>
          <p className="text-gray-700 mb-4 flex justify-start ">Novo usuário? <a href="/TelaCadastro" className="ml-1 text-blue-600 hover:text-blue-800"> Crie uma conta</a></p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <a href="#" className=" flex justify-end text-sm text-txt hover:text-gray-400">Esqueceu a senha?</a>
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
            >
              Entrar
            </button>
            <div className="text-center text-gray-500 mb-4">OU</div>
            <button
              type="button"
              // onClick={signInWithGoogle} // Implemente sua lógica de login com Google aqui
              className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
            >
              <FcGoogle />
              <span className="ml-2">Continuar com o Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;