'use client'
import Link from "next/link";
import { useState } from "react";



export default function AuthenticationBody() {

  interface IcorpoRequest {
    email: string
    senha: string
  }

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  function recebeEmail() {

    let inputEmail = document.getElementById("email") as HTMLInputElement || null;
    let valueEmail = inputEmail.value;

    let inputSenha = document.getElementById("password") as HTMLInputElement || null;
    let valueSenha = inputSenha.value;

    if (valueEmail) {
      valueEmail.toString();
      if (valueEmail !== "") {
        console.log(valueEmail);
      }
    } else {
      alert("Preencha o campo de e-mail");
    }

    if (valueSenha) {
      valueSenha.toString();
      if (valueSenha !== "") {
        console.log(valueSenha);
      }
    } else {
      alert("Preencha o campo de Senha");
    } return 0;
  }


  return (
    <form className="space-y-6" action="#" method="POST">
      <div>
        <label
          form="email"
          className="block text-sm font-bold leading-6 text-gray-900"
        >
          Endereço de Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            required
            className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></input>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            form="password"
            className="block text-sm font-bold  leading-6 text-gray-900"
          >
            Senha
          </label>
          <div className="text-sm">
            <Link href={"/TelaLogin/TelaEsqueciASenha"} className="font-bold text-black">
              Esqueceu a senha?
            </Link>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Sua Senha"
            autoComplete="current-password"
            required
            className="block w-full px-1  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></input>
          <div className="flex py-3 justify-center">
            <a
              onClick={() => recebeEmail()}
              href="#"
              className="rounded-md bg-indigo-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Entrar
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
