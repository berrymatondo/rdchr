import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto container flex flex-col justify-center items-center">
      <p className="md:w-1/2 text-white  text-4xl md:text-6xl text-center mx-2 my-24 rounded-lg p-2">
        Calculateur de salaire brut vers net pour la RDC
      </p>

      <div className="flex justify-center">
        <Link
          className="rounded-full bg-sky-600 hover:bg-sky-400 text-center py-4 px-8 text-2xl text-white"
          href="/simulIPR"
        >
          Démarrez
        </Link>
      </div>
      <div className="flex justify-center px-2 ">
        <p className="rounded-lg bg-white/10 md:w-1/3 text-white/60 p-2 text-center my-16 max-md:text-sm">
          {
            "Cette application vous permet de convertir facilement votre salaire brut en salaire net, en tenant compte des taxes et cotisations sociales spécifiques à la fiscalité de la République Démocratique du Congo. Simple, rapide et précis, elle vous offre une visibilité claire sur vos revenus réels"
          }
        </p>
      </div>
    </div>
  );
}
