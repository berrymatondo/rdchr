import * as z from "zod";

export const simulFormSchema = z.object({
  fullname: z.string().optional(),
  nationalite: z.string().optional(),
  grade: z.string().optional(),
  totalEmployees: z.preprocess(
    (val) => Number(val), // Convertit la valeur en nombre avant validation
    z
      .number()
      .int()
      .min(1, { message: "Le nombre d'employés doit être un entier >= 1" })
  ),

  rate: z.preprocess(
    (val) => parseFloat(val as string), // Convertit les entrées en nombre
    z
      .number()
      .min(1, { message: "Le nombre d'employés doit être un entier >= 0" })
    // z.number().positive({ message: "Le nombre doit être supérieur à 0" }) // Valide les nombres positifs (entiers ou décimaux)
  ),
  logement: z.preprocess(
    (val) => parseFloat(val as string), // Convertit les entrées en nombre
    z
      .number()
      .min(1, { message: "Le nombre d'employés doit être un entier >= 0" })
    // z.number().positive({ message: "Le nombre doit être supérieur à 0" }) // Valide les nombres positifs (entiers ou décimaux)
  ),
  other: z.preprocess(
    (val) => parseFloat(val as string), // Convertit les entrées en nombre
    z
      .number()
      .min(1, { message: "Le nombre d'employés doit être un entier >= 0" })
    // z.number().positive({ message: "Le nombre doit être supérieur à 0" }) // Valide les nombres positifs (entiers ou décimaux)
  ),

  nbrCharge: z.string().optional(),

  basisSalary: z.preprocess(
    (val) => parseFloat(val as string), // Convertit les entrées en nombre
    z
      .number()
      .min(1, { message: "Le nombre d'employés doit être un entier >= 0" })
    // z.number().positive({ message: "Le nombre doit être supérieur à 0" }) // Valide les nombres positifs (entiers ou décimaux)
  ),
  transport: z.preprocess(
    (val) => parseFloat(val as string), // Convertit les entrées en nombre
    z
      .number()
      .min(1, { message: "Le nombre d'employés doit être un entier >= 0" })
    // z.number().positive({ message: "Le nombre doit être supérieur à 0" }) // Valide les nombres positifs (entiers ou décimaux)
  ),
  RBI: z.preprocess(
    (val) => parseFloat(val as string), // Convertit les entrées en nombre
    z
      .number()
      .min(1, { message: "Le nombre d'employés doit être un entier >= 0" })
    // z.number().positive({ message: "Le nombre doit être supérieur à 0" }) // Valide les nombres positifs (entiers ou décimaux)
  ),

  nbrCourses: z.preprocess(
    (val) => parseFloat(val as string), // Convertit les entrées en nombre
    z
      .number()
      .min(1, { message: "Le nombre de courses doit être un entier >= 0" })
    // z.number().positive({ message: "Le nombre doit être supérieur à 0" }) // Valide les nombres positifs (entiers ou décimaux)
  ),
});
