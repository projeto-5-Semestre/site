"use client";

import FooterNavigation from "@/app/TelaLogin/TelaHome/TelaPerfil/Componentes/FooterNavigation";
import HeaderNavigation from "@/components/HeaderNavigation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-screen min-h-screen flex-col bg-white items-center">
      <HeaderNavigation />
      <section className="w-full flex flex-col items-center">
        <div className="w-11/12 max-w-4xl mt-10">
          <Image src="/capa.png" alt="Capa" layout="responsive" width={900} height={506} objectFit="contain" />
        </div>
        <div className="text-center text-txt mt-4 text-lg border-b border-stone-900">
          <h2>Muito Prazer,<br />
            <b>Chegou a sua nova plataforma de TROCA DE ÓLEO</b>
          </h2>
        </div>
      </section>
      <FooterNavigation />
    </main>
  );
}