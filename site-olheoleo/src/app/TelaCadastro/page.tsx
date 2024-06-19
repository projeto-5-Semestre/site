import HeaderNavigation from '../../components/HeaderNavigation';
import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
  return (
    <main className="flex flex-col h-full bg-gray-100">

      <HeaderNavigation />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="flex justify-center text-txt text-2xl font-bold mb-2 border-b ">Faça seu Cadastro</h2>
        <p className="text-gray-700 mb-4">Já é usuário? <a href="/TelaLogin" className="text-blue-600">Faça Login</a></p>
        <div className="flex-grow flex items-center justify-center">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
