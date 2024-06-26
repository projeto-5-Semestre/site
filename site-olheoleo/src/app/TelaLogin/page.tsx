import HeaderNavigation from '../../components/HeaderNavigation';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <HeaderNavigation />
      <div className="flex-grow flex items-center justify-center h-[90%] pt-20">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="flex justify-center text-txt border-b text-2xl font-bold mb-2">Faça seu Login</h2>
          <p className="text-gray-700 mb-4 flex justify-start ">Novo usuário? <a href="/TelaCadastro" className="ml-1 text-blue-600 hover:text-blue-800"> Crie uma conta</a></p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
