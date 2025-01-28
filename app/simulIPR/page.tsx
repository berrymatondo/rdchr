import SimulIPR from "@/components/ipr/simulIPR";
import { getAllParameters } from "@/lib/_paramActions";
import React from "react";

const SimulIPRPage = async () => {
  const parameters = await getAllParameters();

  //console.log("parameters", parameters);
  const CADRE = parameters?.data?.find(
    (param: any) => param.label == "CADRE"
  )?.value;

  const NONCADRE = parameters?.data?.find(
    (param: any) => param.label == "NONCADRE"
  )?.value;

  const MAXCOURSES = parameters?.data?.find(
    (param: any) => param.label == "MAXCOURSES"
  )?.value;

  return (
    <div>
      <SimulIPR
        parameters={parameters?.data}
        CADRE={CADRE}
        NONCADRE={NONCADRE}
        MAXCOURSES={MAXCOURSES}
      />
    </div>
  );
};

export default SimulIPRPage;
