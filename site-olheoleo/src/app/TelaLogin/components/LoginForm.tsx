"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if ((result as { error?: string })?.error) {
        setError('E-mail ou senha incorretos. Por favor, tente novamente.');
      } else {
        router.push('/TelaLogin/TelaHome/TelaMeusVeiculos');
      }
    } catch (err) {
      setError('Ocorreu um erro durante o login. Por favor, tente novamente.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail:</label>
        <input
          name='email'
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          autoComplete = "email"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
        <input
          name='password'
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          required
          autoComplete="current-password"
        />
        <a href="#" className="flex justify-end text-sm text-txt hover:text-gray-400">Esqueceu a senha?</a>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
      >
        Entrar
      </button>
      <div className="text-center text-gray-500 mb-4">OU</div>
      <button
        type="button"
        onClick={() => signIn('google')}
        className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
      >
        <FcGoogle />
        <span className="ml-2">Continuar com o Google</span>
      </button>
    </form>
  );
}
