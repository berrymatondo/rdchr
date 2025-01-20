import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormLabel } from "../ui/form";

type TransportProps = {
  trans: any;
};
const Transport = ({ trans }: TransportProps) => {
  return (
    <div>
      <FormLabel className=" mx-2 max-md:w-1/3 text-sky-950 font-semibold ">
        Transport
      </FormLabel>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Courses/jour</TableHead>
            <TableHead>Total/jour</TableHead>
            <TableHead className="text-right">Total/mois</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trans.map((invoice: any) => (
            <TableRow key={invoice.typeVehicule}>
              <TableCell className="font-medium text-sky-400">
                {invoice.typeVehicule}
              </TableCell>
              <TableCell className="text-white">
                {invoice.coutCourse} $
              </TableCell>
              <TableCell className="text-white">{invoice.nbrCourses}</TableCell>
              <TableCell className="text-white">
                {invoice.nbrCourses * invoice.coutCourse} $
              </TableCell>
              <TableCell className="text-right text-white font-semibold">
                {invoice.nbrCourses * invoice.coutCourse * 26} $
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transport;
