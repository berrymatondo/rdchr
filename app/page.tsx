import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto container flex flex-col justify-center">
      <p className=" text-white bg-white/10 text-4xl text-center mx-2 my-24 rounded-lg p-2">
        Calculateur de salaire brut vers net pour la RDC
      </p>

      <div className="flex justify-center">
        <Link
          className="rounded-full bg-sky-600 text-center py-4 px-8 text-2xl text-white"
          href="/simulIPR"
        >
          Démarrez
        </Link>
      </div>
    </div>
  );
}
