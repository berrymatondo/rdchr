"use client";
import React from "react";
import final from "../public/final.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ButtonSimul = () => {
  const router = useRouter();
  return (
    <div>
      <div
        className="relative px-2 my-4 overflow-hidden"
        onClick={() => router.push("/simulIPR")}
      >
        <Image alt="bg" src={final} className="rounded-lg mx-auto z-5" />
        <p className="z-20 text-center w-full p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white  text-4xl">
          Calculateur de salaire brut vers net pour la RDC
        </p>

        <div className="absolute top-0 left-0 right-0 bottom-0 mx-2 bg-gradient-to-br from-blue-800/40 to-teal-600/40"></div>
      </div>
    </div>
  );
};

export default ButtonSimul;
