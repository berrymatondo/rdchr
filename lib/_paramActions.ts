"use server";

import { z } from "zod";
import prisma from "./prisma";

// GET ALL PARAMETERS
export const getAllParameters = async () => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {
  try {
    const params = await prisma.parameter.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return {
      success: true,
      data: params,
    };
  } catch (error) {}
};
