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
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
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
      name,
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatTelefone = (value: string) => {
    let onlyNums = value.replace(/\D/g, '');
      
    onlyNums = onlyNums.slice(0,11);
    return onlyNums
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2');
  };

  return (
    <form onSubmit={handleSubmit} className='justify-center items-center ml-2 w-[95%]' >
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
        <input
          name='nome'
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            onChange && onChange('name', e.target.value);
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
            const formattedCPF = formatCPF(e.target.value);
            setCpf(formattedCPF);
            onChange && onChange('cpf', formattedCPF.replace(/\D/g, ''));
          }}
          readOnly={readOnly}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder='000.000.000-00'
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
            const formattedTelefone = formatTelefone(e.target.value)
            setTelefone(formattedTelefone);
            onChange && onChange('telefone', formattedTelefone.replace(/\D/g, ''));
          }}
          readOnly={readOnly}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="(00) 00000-0000"
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
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Senha:
        </label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
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
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm2 7a2 2 0 11-4 0 2 2 0 014 0zm-.707 2.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414-1.414l-2-2z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm2 7a2 2 0 11-4 0 2 2 0 014 0zm-.707 2.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414-1.414l-2-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Confirmar Senha:
        </label>
        <input
          name="confirmPassword"
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
