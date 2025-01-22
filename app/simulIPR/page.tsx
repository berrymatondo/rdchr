"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { simulFormSchema } from "../lib/schemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { grades, nationalites, nbrPersonnesCharge } from "@/lib/enums";
import Transport from "@/components/ipr/transport";
import TaxesEmployeur from "@/components/ipr/taxesEmployeur";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
//import { toast } from "sonner";

const cnss_qpo = 0.05;

const trans = [
  {
    typeVehicule: "Taxi",
    coutCourse: 1,
    nbrCourses: 6,
    grade: "Cadre",
  },
  {
    typeVehicule: "Bus",
    coutCourse: 0.5,
    nbrCourses: 6,
    grade: "Autre",
  },
];

const SimulIPR = () => {
  const [nationalite, setNationalite] = useState("");
  const [transpo, setTranspo] = useState(0);

  const form = useForm<z.infer<typeof simulFormSchema>>({
    resolver: zodResolver(simulFormSchema),
    defaultValues: {
      fullname: "",
      //  nationalite: "1",
      //  grade: "1",
      totalEmployees: 1,
      rate: 2833.1,
      logement: 0,
      other: 0,
      nbrCharge: "0",
      basisSalary: 100,
      transport: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof simulFormSchema>) {
    // console.log("Simulation de l'IPR");
    /*     try {
      console.log(values);
      toast.success(
        `L'adresse sur ${values.street} a été modifiée avec succès.`,
        {
          description: new Date().toISOString().split("T")[0],
        }
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } */
  }

  let totalEmployees = form.watch("totalEmployees");
  let expat = form.watch("nationalite");
  let grade = form.watch("grade");
  let basisSalary = form.watch("basisSalary");
  let logement = form.watch("logement");
  let other = form.watch("other");
  let RBI = form.watch("RBI");
  let rate = form.watch("rate");

  useEffect(() => {
    console.log("Grade", grade);

    if (grade == "1") {
      trans.forEach((tr: any) => {
        if (tr.grade === "Cadre") {
          setTranspo(tr.coutCourse * tr.nbrCourses * 26);
        }
      });
    } else {
      if (grade === "2") {
        trans.forEach((tr: any) => {
          if (tr.grade === "Autre") {
            setTranspo(tr.coutCourse * tr.nbrCourses * 26);
          }
        });
      } else setTranspo(0);
    }
  }, [grade]);

  const formatAmount = (amount: number = 0, currency: string) => {
    //    console.log("amount", amount, +amount, currency);

    let tempo = (+amount).toFixed(2);

    //console.log("amount 2", amount, currency);

    return new Intl.NumberFormat().format(+tempo).toString() + " " + currency;
  };

  const buildRB = () => {
    const usd = +basisSalary + +transpo + +logement + +other;
    const cdf = (+basisSalary + +transpo + +logement + +other) * rate;
    return {
      rbUSD: usd,
      rbCDF: cdf,
    };
  };

  const buildIpr = () => {
    const rniUSD =
      +basisSalary +
      buildExcLog().USD -
      (+basisSalary + buildExcLog().USD) * 0.05;
    const rni = rniUSD * rate;
    /*     console.log("rniUSD: ", rniUSD);
    console.log("rate: ", rate);
    console.log("rni: ", rni); */
    const ipr30 = (rni * 0.3).toFixed(2);
    const ipr30USD = (rniUSD * 0.3).toFixed(2);

    if (rni < 180001)
      return {
        ipr:
          +(rni * 0.03).toFixed(2) > +ipr30 ? +ipr30 : +(rni * 0.03).toFixed(2),
        iprUSD:
          +(rniUSD * 0.03).toFixed(2) > +ipr30USD
            ? ipr30USD
            : +(rniUSD * 0.03).toFixed(2),
        ipr30: +ipr30,
        ipr30USD: +ipr30USD,
        iprCalCDF: +(rni * 0.03).toFixed(2),
        iprCalUSD: +(rniUSD * 0.03).toFixed(2),
        tranche: "3%",
      };

    if (rni > 180000 && rni < 1800001) {
      // /console.log("ipr", +(4860 + (rni - 162000) * 0.15).toFixed(2));

      return {
        ipr:
          +(4860 + (rni - 162000) * 0.15).toFixed(2) > +ipr30
            ? +ipr30
            : +(4860 + (rni - 162000) * 0.15).toFixed(2),
        iprUSD:
          +((4860 + (rni - 162000) * 0.15) / rate).toFixed(2) > +ipr30USD
            ? +ipr30USD
            : +((4860 + (rni - 162000) * 0.15) / rate).toFixed(2),
        ipr30: +ipr30,
        ipr30USD: +ipr30USD,
        tranche: "15%",
        iprCalCDF: +(4860 + (rni - 162000) * 0.15).toFixed(2),
        iprCalUSD: +((4860 + (rni - 162000) * 0.15) / rate).toFixed(2),
      };
    }

    if (rni > 1800000 && rni < 3600001)
      return {
        ipr:
          +(4860 + 245700 + (rni - 1800000) * 0.3).toFixed(2) > +ipr30
            ? +ipr30
            : +(4860 + 245700 + (rni - 1800000) * 0.3).toFixed(2),
        iprUSD:
          +((4860 + 245700 + (rni - 1800000) * 0.3) / rate).toFixed(2) >
          +ipr30USD
            ? +ipr30USD
            : +((4860 + 245700 + (rni - 1800000) * 0.3) / rate).toFixed(2),
        ipr30: +ipr30,
        ipr30USD: +ipr30USD,
        tranche: "30%",
        iprCalCDF: +(4860 + 245700 + (rni - 1800000) * 0.3).toFixed(2),
        iprCalUSD: +((4860 + 245700 + (rni - 1800000) * 0.3) / rate).toFixed(2),
      };

    if (rni > 3600000)
      return {
        ipr:
          +(4860 + 245700 + 540000 + (rni - 3600000) * 0.4).toFixed(2) > +ipr30
            ? +ipr30
            : +(4860 + 245700 + 540000 + (rni - 3600000) * 0.4).toFixed(2),
        iprUSD:
          +((4860 + 245700 + 540000 + (rni - 3600000) * 0.4) / rate).toFixed(
            2
          ) > +ipr30USD
            ? +ipr30USD
            : +(
                (4860 + 245700 + 540000 + (rni - 3600000) * 0.4) /
                rate
              ).toFixed(2),
        ipr30: +ipr30,
        ipr30USD: +ipr30USD,
        tranche: "40%",
        iprCalCDF: +(4860 + 245700 + 540000 + (rni - 3600000) * 0.4).toFixed(2),
        iprCalUSD: +(
          (4860 + 245700 + 540000 + (rni - 3600000) * 0.4) /
          rate
        ).toFixed(2),
      };

    // return rni;
  };

  /*   const buildExtraLogs = () => {
    return                             {formatAmount(
      (((logement * 100) / basisSalary - 30) * 100) /
        basisSalary,
      " USD"
    )}
  }
 */

  const buildExcLog = () => {
    let exces = 0;

    //console.log("logement", +logement);
    //console.log("basisSalary", +basisSalary);
    const val = (+logement * 100) / +basisSalary;

    if (val <= 30) {
      // console.log("EXCES", exces);
      return {
        CDF: exces * rate,
        USD: exces,
        logCDF: +logement * rate,
        logUSD: +logement,
      };
    }
    exces = ((val - 30) * +basisSalary) / 100;

    //console.log("exces = ", exces);

    return {
      CDF: exces * rate,
      USD: exces,
      logCDF: +logement * rate,
      logUSD: +logement,
    };
  };

  return (
    <div className="flex flex-col bg-slate-950">
      <p className="text-2xl text-center text-blue-900">
        Calculateur du Salaire Net
      </p>
      <div className="my-1 bg-slate-200">
        <Link href="/">Home</Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 md:container mx-auto md:py-10  w-full p-2"
        >
          <div className="grid md:grid-cols-3 gap-2">
            <div className=" rounded-lg overflow-hidden border-2 border-neutral-700 ">
              <p className="font-semibold text-sky-800 bg-sky-100 text-center p-2  border">
                {" "}
                Informations générales
              </p>

              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className="mb-2 mt-2 px-2">
                    <div className=" text-white/80 w-full flex items-center max-md:justify-between justify-end gap-2 ">
                      <FormLabel className="max-md:w-1/3 text-sky-400 whitespace-break- ">
                        Nom de l'employé(e)
                      </FormLabel>
                      <FormControl className="w-full md:w-2/3 text-white font-semibold">
                        <Input
                          placeholder="Entrer le nom de l'employé(e)"
                          type="text"
                          {...field}
                          className="border border-neutral-700  bg-[#0e172a]"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-center " />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationalite"
                render={({ field }) => {
                  return (
                    <FormItem className="mb-2 px-2">
                      <div className="text-white/80 w-full flex items-center max-md:justify-between justify-end gap-2 ">
                        <FormLabel className="max-md:w-1/3 text-sky-400">
                          Nationalité
                        </FormLabel>
                        <div className="w-full md:w-2/3 text-white font-semibold">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger id="framework">
                              <SelectValue placeholder="Sélectionner la nationalité" />
                            </SelectTrigger>
                            <SelectContent position="popper" className="">
                              {nationalites?.map((ur: any) => (
                                <SelectItem key={ur.id} value={ur.id}>
                                  {ur.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <FormMessage className="text-center " />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => {
                  return (
                    <FormItem className="mb-2 px-2">
                      <div className="text-white/80 w-full flex items-center max-md:justify-between justify-end gap-2 ">
                        <FormLabel className="max-md:w-1/3  text-sky-400">
                          Grade
                        </FormLabel>
                        <div className="w-full md:w-2/3 text-white font-semibold">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger id="framework">
                              <SelectValue placeholder="Sélectionner un grade" />
                            </SelectTrigger>
                            <SelectContent position="popper" className="">
                              {grades?.map((ur: any) => (
                                <SelectItem key={ur.id} value={ur.id}>
                                  {ur.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <FormMessage className="text-center " />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="totalEmployees"
                render={({ field }) => (
                  <FormItem className="mb-2 px-2">
                    <div className="text-white/80 w-full flex items-center max-md:justify-between justify-end gap-2 ">
                      <FormLabel className="max-md:w-1/3  text-sky-400">
                        Total employé(e)s
                      </FormLabel>
                      <FormControl className="w-full md:w-2/3 text-white font-semibold">
                        <Input
                          placeholder="shadcn"
                          type="number"
                          {...field}
                          className="border border-neutral-700  bg-[#0e172a]"
                        />
                      </FormControl>
                    </div>

                    <FormMessage className="text-center " />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem className="mb-2 px-2">
                    <div className="text-white/80 w-full flex items-center max-md:justify-between justify-end gap-2">
                      <FormLabel className="max-md:w-1/3  text-sky-400 ">
                        Taux USD/CDF
                      </FormLabel>
                      <FormControl className="relative w-full md:w-2/3 text-white font-semibold">
                        <div className="relative">
                          <Input
                            placeholder="Entrer le taux USD/CDF"
                            type="number"
                            step={0.1}
                            {...field}
                            className="border border-neutral-700  bg-[#0e172a]"
                          />
                          {/*               <p className="absolute top-1/2 left-1/2 transform  -translate-y-1/2 text-neutral-400">
                            CDF
                          </p> */}
                        </div>
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" rounded-lg overflow-hidden  border-2 border-neutral-700  ">
              <p className="font-semibold text-sky-800 bg-sky-100 text-center p-2  border">
                {" "}
                Salaire, Transport et logement
              </p>

              <FormField
                control={form.control}
                name="basisSalary"
                render={({ field }) => (
                  <FormItem className="mb-2 mt-2 px-2">
                    <div className="w-full flex items-center max-md:justify-between justify-end gap-2 ">
                      <FormLabel className="max-md:w-1/3  text-sky-400 ">
                        Salaire de base
                      </FormLabel>
                      <FormControl className="relative w-full md:w-2/3  text-white font-semibold">
                        <div className="relative">
                          <Input
                            placeholder="Entrer le salaire de base"
                            type="number"
                            step={0.1}
                            {...field}
                            className="border border-neutral-700  bg-[#0e172a]"
                          />
                          <p className="absolute top-1/2 left-1/2 transform  -translate-y-1/2 text-neutral-400">
                            USD
                          </p>
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage className="text-center " />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logement"
                render={({ field }) => (
                  <FormItem className="mb-2 mt-2 px-2">
                    <div className="w-full flex items-center max-md:justify-between justify-end gap-2">
                      <FormLabel className="max-md:w-1/3  text-sky-400  ">
                        Logement
                      </FormLabel>
                      <FormControl className="relative w-full md:w-2/3   text-white font-semibold">
                        <div className="relative">
                          <Input
                            placeholder="Entrer la participation au logement"
                            type="number"
                            step={0.1}
                            {...field}
                            className="border border-neutral-700  bg-[#0e172a]"
                          />
                          <p className="absolute top-1/2 left-1/2 transform  -translate-y-1/2 text-neutral-400">
                            USD
                          </p>
                        </div>
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="other"
                render={({ field }) => (
                  <FormItem className="mb-2 mt-2 px-2">
                    <div className="w-full flex items-center max-md:justify-between justify-end gap-2">
                      <FormLabel className="max-md:w-1/3  text-sky-400 ">
                        Frais médicaux, ...
                      </FormLabel>
                      <FormControl className="relative w-full md:w-2/3   text-white font-semibold">
                        <div className="relative">
                          <Input
                            placeholder="Entrer la participation au logement"
                            type="number"
                            step={0.1}
                            {...field}
                            className="border border-neutral-700  bg-[#0e172a]"
                          />
                          <p className="absolute top-1/2 left-1/2 transform  -translate-y-1/2 text-neutral-400">
                            USD
                          </p>
                        </div>
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Transport trans={trans} />
            </div>
            <div className=" rounded-lg overflow-hidden  border-2 border-neutral-700  ">
              <p className="font-semibold text-sky-800 bg-sky-100 text-center p-2  border">
                {" "}
                Charges familiales
              </p>

              <FormField
                control={form.control}
                name="nbrCharge"
                render={({ field }) => (
                  <FormItem className="mb-2 mt-2 px-2">
                    <div className="w-full flex items-center max-md:justify-between justify-end gap-2">
                      <FormLabel className="max-md:w-1/3 text-sky-400 ">
                        Personnnes à charge{" "}
                      </FormLabel>
                      <div className="w-full md:w-2/3 text-white font-semibold">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Sélectionner la nationalité" />
                          </SelectTrigger>
                          <SelectContent position="popper" className="">
                            {nbrPersonnesCharge?.map((ur: any) => (
                              <SelectItem key={ur.id} value={ur.label}>
                                {ur.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className=" rounded-lg overflow-hidden  border-2 border-neutral-700  ">
              <p className="font-semibold text-sky-800 bg-sky-100 text-center p-2  border">
                {" "}
                Allocations et bonus
              </p>

              <FormField
                control={form.control}
                name="nbrCharge"
                render={({ field }) => (
                  <FormItem className="mb-2 mt-2 px-2">
                    <div className="w-full flex items-center max-md:justify-between justify-end gap-2">
                      <FormLabel className="max-md:w-1/3 text-sky-400  ">
                        Allocations et bonus
                      </FormLabel>
                      <div className="w-full md:w-2/3  text-white font-semibold">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Sélectionner la nationalité" />
                          </SelectTrigger>
                          <SelectContent position="popper" className="">
                            {nbrPersonnesCharge?.map((ur: any) => (
                              <SelectItem key={ur.id} value={ur.label}>
                                {ur.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className=" rounded-lg overflow-hidden  border-2 border-neutral-700  ">
              <p className="font-semibold text-sky-800 bg-sky-100 text-center p-2  border">
                {" "}
                Salaire Employé(e)
              </p>

              {/*               <FormField
                control={form.control}
                name="basisSalary"
                render={({ field }) => (
                  <FormItem className="mb-2 mt-2 px-2">
                    <div className="w-full flex items-center max-md:justify-between justify-end gap-2 ">
                      <FormLabel className="max-md:w-1/3 text-sky-950 font-semibold ">
                        Salaire de base
                      </FormLabel>
                      <FormControl className="relative w-full md:w-2/3">
                        <div className="relative">
                          <Input
                            placeholder="Entrer le salaire de base"
                            type="number"
                            step={0.1}
                            {...field}
                            disabled
                          />
                          <p className="absolute top-1/2 left-1/2 transform  -translate-y-1/2 text-neutral-400">
                            USD
                          </p>
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage className="text-center " />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logement"
                render={({ field }) => (
                  <FormItem className="mb-2 mt-2 px-2">
                    <div className="w-full flex items-center max-md:justify-between justify-end gap-2">
                      <FormLabel className="max-md:w-1/3 text-sky-950 font-semibold ">
                        Logement
                      </FormLabel>
                      <FormControl className="relative w-full md:w-2/3">
                        <div className="relative">
                          <Input
                            placeholder="0"
                            type="number"
                            step={0.1}
                            {...field}
                            disabled
                          />
                          <p className="absolute top-1/2 left-1/2 transform  -translate-y-1/2 text-neutral-400">
                            USD
                          </p>
                        </div>
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transport"
                render={({ field }) => (
                  <FormItem className="mb-2 mt-2 px-2">
                    <div className="w-full flex items-center max-md:justify-between justify-end gap-2">
                      <FormLabel className="max-md:w-1/3 text-sky-950 font-semibold ">
                        Transport
                      </FormLabel>
                      <FormControl className="relative w-full md:w-2/3">
                        <div className="relative">
                          <Input
                            placeholder="0"
                            type="number"
                            step={0.1}
                            {...field}
                            disabled
                            value={transpo}
                          />
                          <p className="absolute top-1/2 left-1/2 transform  -translate-y-1/2 text-neutral-400">
                            USD
                          </p>
                        </div>
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <div className="mb-2 mt-2 p-2 w-full flex items-center max-md:justify-between justify-end gap-2">
                <Label className="max-md:w-1/3  text-sky-400 ">
                  Salaire de base
                </Label>
                <div className="w-full md:w-2/3 grid grid-cols-3 gap-2">
                  <Label className="col-span-2 flex items-center justify-end whitespace-nowrap font-semibold  text-white">
                    {formatAmount(basisSalary * rate, " CDF")}
                  </Label>
                  <Label className="flex items-center justify-end whitespace-nowrap text-neutral-500 text-xs">
                    {formatAmount(basisSalary, " USD")}
                  </Label>
                </div>
              </div>

              <div className="bg-green-200 mx-2 rounded-lg">
                <Label className="mx-2 font-semibold">
                  Avantages non imposables
                </Label>
                {logement > 0 && (
                  <div className="mb-2 mt-2 p-2 w-full flex items-start max-md:justify-between justify-end gap-2">
                    <Label className="max-md:w-1/3 text-sky-950 ">
                      Logement
                    </Label>
                    <div className="w-full md:w-2/3 flex justify-end ">
                      <Label className="flex flex-col items-end justify-end whitespace-nowrap font-semibold text-blue-950">
                        {formatAmount(logement * rate, " CDF")}
                        <p className="font-extralight mt-1">
                          {((logement * 100) / basisSalary).toFixed(2)}%
                        </p>
                        {(logement * 100) / basisSalary > 30 && (
                          <span className="font-extralight text-red-400">
                            +
                            {formatAmount(
                              ((((logement * 100) / basisSalary - 30) * 100) /
                                basisSalary) *
                                rate,
                              " CDF"
                            )}
                          </span>
                        )}
                      </Label>
                      <Label className="w-1/3 flex flex-col items-end justify-end whitespace-nowrap text-neutral-500 text-xs">
                        {formatAmount(+logement, " USD")}
                        <p className="font-extralight mt-1">
                          {((logement * 100) / basisSalary).toFixed(2)}%
                        </p>
                        {(logement * 100) / basisSalary > 30 && (
                          <span className="font-extralight text-red-400">
                            {/*                             +{buildExtraLog()?.usd}
                             */}{" "}
                            +
                            {formatAmount(
                              (((logement * 100) / basisSalary - 30) * 100) /
                                basisSalary,
                              " USD"
                            )}
                          </span>
                        )}
                      </Label>
                    </div>
                  </div>
                )}

                {transpo > 0 && (
                  <div className="mb-2 mt-2 p-2 w-full flex items-center max-md:justify-between justify-end gap-2">
                    <Label className="max-md:w-1/3 text-sky-950 ">
                      Transport
                    </Label>
                    <div className="w-full md:w-2/3 grid grid-cols-3 gap-2">
                      <Label className="col-span-2 flex items-center justify-end whitespace-nowrap font-semibold text-blue-950">
                        {formatAmount(transpo * rate, " CDF")}
                      </Label>
                      <Label className="flex items-center justify-end whitespace-nowrap text-neutral-500 text-xs">
                        {formatAmount(transpo, " USD")}
                      </Label>
                    </div>
                  </div>
                )}

                {other > 0 && (
                  <div className="mb-2 mt-2 p-2 w-full flex items-center max-md:justify-between justify-end gap-2">
                    <Label className="max-md:w-1/3 text-sky-950 ">Autres</Label>
                    <div className="w-full md:w-2/3 grid grid-cols-3 gap-2">
                      <Label className="col-span-2 flex items-center justify-end whitespace-nowrap font-semibold text-blue-950">
                        {formatAmount(+other * rate, " CDF")}
                      </Label>
                      <Label className="flex items-center justify-end whitespace-nowrap text-neutral-500 text-xs">
                        {formatAmount(+other, " USD")}
                      </Label>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-2 mt-2 p-2 w-full flex items-center max-md:justify-between justify-end gap-2">
                <Label className="max-md:w-1/3  text-sky-400 ">
                  Revenu Brut
                </Label>
                <div className="w-full md:w-2/3 grid grid-cols-3 gap-2">
                  <Label className="col-span-2 flex items-center justify-end whitespace-nowrap font-semibold text-white">
                    {formatAmount(buildRB().rbCDF, " CDF")}
                  </Label>
                  <Label className="flex items-center justify-end whitespace-nowrap text-neutral-500 text-xs">
                    {formatAmount(buildRB().rbUSD, " USD")}
                  </Label>
                </div>
              </div>

              <div className="mb-2 mt-2 p-2 w-full flex items-center max-md:justify-between justify-end gap-2">
                <Label className="max-md:w-1/3  text-sky-400 ">
                  Rev. Brut Impo.
                </Label>
                <div className="w-full md:w-2/3 grid grid-cols-3 gap-2">
                  <Label className="col-span-2 flex items-center justify-end whitespace-nowrap font-semibold text-white">
                    {formatAmount(
                      +basisSalary * rate + +buildExcLog().CDF,
                      " CDF"
                    )}
                  </Label>
                  <Label className="flex items-center justify-end whitespace-nowrap text-neutral-500 text-xs">
                    {formatAmount(+basisSalary + +buildExcLog().USD, " USD")}
                  </Label>
                </div>
              </div>

              <div className="mb-2 p-2 w-full flex items-center max-md:justify-between justify-end gap-2">
                <Label className="max-md:w-1/3  text-sky-400 ">CNSS QPO</Label>
                <div className="w-full md:w-2/3 grid grid-cols-3 gap-2">
                  <Label className="col-span-2 flex items-center justify-end whitespace-nowrap font-semibold text-white">
                    {formatAmount(basisSalary * cnss_qpo * rate, " CDF")}
                  </Label>
                  <Label className="flex items-center justify-end whitespace-nowrap text-neutral-500 text-xs">
                    {formatAmount(basisSalary * cnss_qpo, " USD")}
                  </Label>
                </div>
              </div>

              <div className="mb-2  p-2 w-full flex items-center max-md:justify-between justify-end gap-2">
                <Label className="max-md:w-1/3  text-sky-400  ">
                  Rev. Net Impo.
                </Label>
                <div className="w-full md:w-2/3 grid grid-cols-3 gap-2">
                  <Label className="col-span-2 flex items-center justify-end whitespace-nowrap font-semibold text-white">
                    {formatAmount(
                      (+basisSalary +
                        +buildExcLog().CDF -
                        (+basisSalary + +buildExcLog().CDF) * 0.05) *
                        rate,
                      " CDF"
                    )}
                  </Label>
                  <Label className="flex items-center justify-end whitespace-nowrap text-neutral-500 text-xs">
                    {formatAmount(
                      +basisSalary +
                        +buildExcLog().USD -
                        (+basisSalary + +buildExcLog().USD) * 0.05,
                      " USD"
                    )}
                  </Label>
                </div>
              </div>

              <div className="mb-2 p-2 w-full flex items-center max-md:justify-between justify-end gap-2">
                <Label className="max-md:w-1/3  text-sky-400 ">I.P.R.</Label>
                <div className="w-full md:w-2/3 grid grid-cols-3 gap-2">
                  <Label className="col-span-2 flex items-center justify-end whitespace-nowrap font-semibold text-blue-950">
                    <Badge className="bg-sky-900">
                      {formatAmount(buildIpr()?.ipr!, " CDF")}{" "}
                    </Badge>
                  </Label>
                  <Label className="flex items-center justify-end whitespace-nowrap text-neutral-500 text-xs">
                    {formatAmount(+buildIpr()?.iprUSD!, " USD")}
                  </Label>
                </div>
              </div>

              <div className="text-blue-900 bg-gray-200 flex flex-col gap-2 m-2 rounded-lg p-2">
                <Label>
                  Tranche:{" "}
                  <span className="font-semibold">{buildIpr()?.tranche}</span>
                </Label>

                <Label>
                  IPR-30%:{" "}
                  <span className="font-semibold">{buildIpr()?.ipr30} CDF</span>
                  {" || "}
                  <span className="font-semibold">
                    {buildIpr()?.ipr30USD} USD
                  </span>
                </Label>
                <Label>
                  IPR-Calc:{" "}
                  <span className="font-semibold">
                    {formatAmount(buildIpr()?.iprCalCDF, " CDF")}{" "}
                  </span>
                  {" || "}
                  <span className="font-semibold">
                    {formatAmount(buildIpr()?.iprCalUSD, " USD")}
                  </span>
                </Label>
              </div>

              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className="mb-2 mt-2 px-2">
                    <div className="p-2 rounded-lg bg-sky-600 text-white w-full flex items-center max-md:justify-between justify-end gap-2 ">
                      <FormLabel className="max-md:w-1/3 ">
                        Net à payer
                      </FormLabel>
                      <FormControl className="w-full md:w-2/3">
                        <div className="relative  grid grid-cols-3 gap-2">
                          <Label className="col-span-2 text-right font-semibold text-white px-4">
                            {formatAmount(
                              +basisSalary * rate -
                                /*                                 buildExcLog().CDF -
                                (+basisSalary + buildExcLog().CDF) * 0.05) *
                                rate - */
                                buildIpr()?.ipr! +
                                +buildExcLog().logCDF +
                                +transpo * rate +
                                +other * rate,
                              " CDF"
                            )}
                          </Label>
                          <Label className="flex items-center justify-end whitespace-nowrap ">
                            {formatAmount(
                              +basisSalary -
                                /* +buildExcLog().USD -
                                (+basisSalary + buildExcLog().USD) * 0.05 - */
                                +buildIpr()?.iprUSD! +
                                +buildExcLog().logUSD +
                                +transpo +
                                +other,
                              " USD"
                            )}
                          </Label>
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage className="text-center " />
                  </FormItem>
                )}
              />
            </div>

            <div className=" rounded-lg overflow-hidden border-2 border-neutral-700 ">
              <p className="font-semibold text-sky-800 bg-sky-100 text-center p-2  border">
                {" "}
                Taxes employeur
              </p>
              <TaxesEmployeur
                totalEmployees={totalEmployees}
                expat={expat == "Expat" ? true : false}
                RBI={basisSalary}
              />
            </div>

            <div className="m-4">
              <Button type="submit">Compute</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SimulIPR;
