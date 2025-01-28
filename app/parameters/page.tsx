import ParamForm from "@/components/param/paramForm";
import { getAllParameters } from "@/lib/_paramActions";
import React from "react";

const ParamsPage = async () => {
  const params = await getAllParameters();
  // console.log("params: ", params?.data);

  return (
    <div>
      <ParamForm params={params?.data} />
    </div>
  );
};

export default ParamsPage;
