import Link from "next/link";
import Modal_AddVeiculos from "@/components/Modal_AddVeiculos";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <p className="text-red-950">

        <Link href={"/TelaLogin"} >Login</Link>
      </p>
      <div className="text-red-950"><Link href={"/TelaLoginAdmin"} >Login Admin</Link></div>
      <button type="button" className="bg-black">
        <Modal_AddVeiculos />
      </button>
    </main>
  );
}