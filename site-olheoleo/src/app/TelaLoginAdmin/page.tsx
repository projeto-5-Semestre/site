import Link from "next/link";
import "../globals.css";
import AuthenticationBody from "../TelaLogin/Componentes/AuthenticationBody/AuthenticationBody";
import AuthenticationBodyAdmin from "./Componentes/AuthenticationBodyAdmin";

export default function TelaLogin() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text">
      <div className="bg-white border-slate-100 dark:bg-slate-500 dark:border-slate-500 border-b rounded-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-3 sm:space-y-8 lg:space-y-6 xl:space-y-8">
        <div className="flex min-h-full flex-col justify-center px-6  lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Bem-vindo
            </h2>
            <p className="mt-3 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
              To the future of transportation
            </p>
          </div>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <AuthenticationBodyAdmin/>
        </div>
        <Link href={"/TelaCadastro"} className="text-center font-bold  text-black">Cadastre-se</Link>
      </div>
    </main>
  );
}