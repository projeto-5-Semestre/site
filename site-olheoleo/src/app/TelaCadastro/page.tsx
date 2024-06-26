import HeaderNavigation from '../../components/HeaderNavigation';
import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
  return (
    <main className="flex flex-col justify-center h-full bg-gray-100">
      <HeaderNavigation />
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md w-full max-w-sm mx-auto mb-4 mt-4">
        <h2 className="flex justify-center text-txt text-2xl font-bold mb-2 border-b">Faça seu Cadastro</h2>
        <p className="text-gray-700 mb-4">Já é usuário? <a href="/TelaLogin" className="text-blue-600">Faça Login</a></p>
      </div>
      <div className="flex flex-row items-center justify-center mb-2">
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
