import React from "react";
import { Label } from "../ui/label";
import Link from "next/link";

type ParamFormProps = {
  params: any;
};
const ParamForm = ({ params }: ParamFormProps) => {
  return (
    <div className="flex flex-col bg-slate-950">
      <p className="text-2xl text-center text-blue-900">
        Calculateur du Salaire Net
      </p>
      <div className="my-1 bg-slate-200 flex gap-2">
        <Link href="/">Home</Link>
        <Link href="/simulIPR">Simulation</Link>
      </div>
      <p className="text-white">Para meters</p>
      {params
        ? params.map((param: any) => (
            <div key={param.id} className="p-4 bg-[#212025]">
              <span className="text-neutral-400">
                {param.label}- {param.value}
              </span>
              <Label className="p-2 bg-[#cae6eb] text-black ">
                {param.label}
              </Label>
            </div>
          ))
        : null}
    </div>
  );
};

export default ParamForm;
