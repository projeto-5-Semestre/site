import React, { useState, useEffect } from 'react';
import { User } from '../../../../services/auth';

type UserFormProps = {
  error: string | null;
  initialData?: User | null;
  onSubmit: (userData: User) => void;
  isNewUser?: boolean;
  onChange?: (field: keyof User, value: string) => void;
  readOnly?: boolean;
};

const UserForm: React.FC<UserFormProps> = ({ onSubmit, error, initialData, isNewUser, onChange, readOnly }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome);
      setCpf(initialData.cpf);
      setEmail(initialData.email);
      setTelefone(initialData.telefone);
      setPassword(initialData.password);
      setConfirmPassword(initialData.password);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = initialData?.id || '';
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    const userData: User = {
      id,
      nome,
      cpf,
      email,
      telefone,
      password,
      veiculos: initialData?.veiculos || [],
    };

    onSubmit(userData);
  };
  const handleInputChange = (field: keyof User, value: string) => {
    if (!readOnly && onChange) {
      onChange(field, value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='justify-center items-center ml-2 w-[95%]' >
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
        <input
          name='nome'
          type="text"
          id="name"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            onChange && onChange('nome', e.target.value);
          }}
          readOnly={readOnly}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cpf" className="block text-gray-700 text-sm font-bold mb-2">CPF:</label>
        <input
          name='cpf'
          type="text"
          id="cpf"
          value={cpf}
          onChange={(e) => {
            setCpf(e.target.value);
            onChange && onChange('cpf', e.target.value);
          }}
          readOnly={readOnly}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="telefone" className="block text-gray-700 text-sm font-bold mb-2">Celular:</label>
        <input
          name='telefone'
          type="text"
          id="telefone"
          value={telefone}
          onChange={(e) => {
            setTelefone(e.target.value);
            onChange && onChange('telefone', e.target.value);
          }}
          readOnly={readOnly}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail:</label>
        <input
          name='email'
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            onChange && onChange('email', e.target.value);
          }}
          readOnly={readOnly}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
        <input
          name='password'
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            onChange && onChange('password', e.target.value);
          }}
          readOnly={readOnly}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirmar Senha:</label>
        <input
          name='confirmPassword'
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          readOnly={readOnly}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isNewUser && (
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-4"
        >
          Salvar
        </button>
      )}
    </form>
  );
};

export default UserForm;
