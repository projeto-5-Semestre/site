import Image from "next/image";
import Link from "next/link";

export default function Home() {s
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <p className="text-red-950"> 

          <Link href={"/TelaLogin"} >Login</Link>
      </p>
      <div className="text-red-950"><Link href={"/TelaLoginAdmin"} >Login Admin</Link></div>
    </main>
  );
}
