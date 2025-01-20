import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import final from "../public/final.jpg";

export default function Home() {
  return (
    <>
      <div className="md:hidden  mx-auto container flex flex-col justify-center items-center">
        <p className="md:w-1/2 text-white  text-4xl md:text-6xl text-center mx-2 mt-24 rounded-lg p-2">
          Calculateur de salaire brut vers net pour la RDC
        </p>

        <div className=" px-2 my-4">
          <Image alt="bg" src={final} className="rounded-lg mx-auto" />
        </div>

        <div className="flex justify-center">
          <Link
            className="rounded-full bg-sky-600 hover:bg-sky-400 text-center py-4 px-8 text-2xl text-white"
            href="/simulIPR"
          >
            Démarrez
          </Link>
        </div>
        <div className="flex justify-center px-2 ">
          <p className="rounded-lg bg-white/10 md:w-1/3 text-white/60 p-2 text-center my-8 max-md:text-sm">
            {
              "Cette application vous permet de convertir facilement votre salaire brut en salaire net, en tenant compte des taxes et cotisations sociales spécifiques à la fiscalité de la République Démocratique du Congo. Simple, rapide et précis, elle vous offre une visibilité claire sur vos revenus réels"
            }
          </p>
        </div>
      </div>

      <div className="max-md:hidden  mx-auto container flex  justify-center items-center pt-24">
        <div className=" w-1/2 flex flex-col items-center justify-between gap-16">
          {" "}
          <p className=" text-white  text-4xl md:text-6xl text-center mx-2 rounded-lg p-2">
            Calculateur de salaire brut vers net pour la RDC
          </p>
          <div className="flex justify-center px-2 ">
            <p className="rounded-lg bg-white/10  text-white/60 p-2 text-center my-8 text-lg">
              {
                "Cette application vous permet de convertir facilement votre salaire brut en salaire net, en tenant compte des taxes et cotisations sociales spécifiques à la fiscalité de la République Démocratique du Congo. Simple, rapide et précis, elle vous offre une visibilité claire sur vos revenus réels"
              }
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              className="rounded-full bg-sky-600 hover:bg-sky-400 text-center py-4 px-8 text-2xl text-white"
              href="/simulIPR"
            >
              Démarrez
            </Link>
          </div>
        </div>

        <div className=" px-2 my-4">
          <Image alt="bg" src={final} className="rounded-lg mx-auto" />
        </div>
      </div>
    </>
  );
}
