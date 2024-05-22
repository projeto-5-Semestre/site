"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../../../services/auth'

import { FcGoogle } from "react-icons/fc";
import HeaderNavigation from '../TelaLogin/TelaHome/TelaMeusVeiculos/components/HeaderNavigation';


type User = {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
};

const RegisterPage = () => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const url = 'http://localhost:3000/usuarios';

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        try {
            const usersResponse = await fetch(`${url}`);
            const users = await usersResponse.json();

            const userWithCpf = users.find((user: User) => user.cpf === cpf);
            if (userWithCpf) {
                setError('CPF já cadastrado.');
                return;
            }

            const userWithEmail = users.find((user: User) => user.email === email);
            if (userWithEmail) {
                setError('Email já cadastrado.');
                return;
            }

            const userWithTelefone = users.find((user: User) => user.telefone === telefone);
            if (userWithTelefone) {
                setError('Telefone já cadastrado.');
                return;
            }

            const newUserData = {
                nome,
                cpf,
                email,
                telefone,
                senha: password,
                veiculos: []
            };

            const result = await register(newUserData);
            if (result.success) {
                router.push('/TelaLogin');
            } else {
                setError('Erro no cadastro. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error(error);
            setError('Ocorreu um erro durante o cadastro. Por favor, tente novamente.');
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <HeaderNavigation />
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                    <h2 className="flex justify-center text-txt text-2xl font-bold mb-2 border-b ">Faça seu Cadastro</h2>
                    <p className="text-gray-700 mb-4">Já é usuário? <a href="/TelaLogin" className="text-blue-600">Faça Login</a></p>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
                            <input
                                type="text"
                                id="name"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cpf" className="block text-gray-700 text-sm font-bold mb-2">CPF:</label>
                            <input
                                type="text"
                                id="cpf"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="telefone" className="block text-gray-700 text-sm font-bold mb-2">Celular:</label>
                            <input
                                type="text"
                                id="telefone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
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
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirmar Senha:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
                        >
                            Registrar
                        </button>
                        <div className="text-center text-gray-500 mb-4">OU</div>
                        <button
                            type="button"
                            // onClick={signUpWithGoogle} // Implemente sua lógica de cadastro com Google aqui
                            className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
                        >
                            <FcGoogle />
                            <span className="ml-2">Cadastrar com o Google</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;