import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

let invoices = [
  {
    tax: "CNSS QPP",
    rate: 13,
    amount: "250.00",
  },
  {
    tax: "ONEM",
    rate: 0.2,
    amount: "150.00",
  },
  {
    tax: "INPP",
    rate: 3,
    amount: "350.00",
  },
  {
    tax: "IERE",
    rate: 25,
    amount: "450.00",
  },
];

type TaxesEmployeurProps = {
  totalEmployees: any;
  expat: boolean;
  RBI: number;
};
const TaxesEmployeur = ({
  totalEmployees,
  expat,
  RBI,
}: TaxesEmployeurProps) => {
  //console.log("RBI", RBI);

  // CASE CNSS QPP

  invoices.forEach((invoice) => {
    if (invoice.tax === "CNSS QPP") {
      //invoice.rate = inpp;
      invoice.amount = ((RBI * invoice.rate) / 100).toString();
    }
  });

  //CASE ONEM

  invoices.forEach((invoice) => {
    if (invoice.tax === "ONEM") {
      // invoice.rate = inpp;
      invoice.amount = ((RBI * invoice.rate) / 100).toString();
    }
  });

  // CASE INPP
  let inpp = 1;
  if (+totalEmployees < 51) inpp = 3;
  if (+totalEmployees > 50 && +totalEmployees < 151) inpp = 2;

  invoices.forEach((invoice) => {
    if (invoice.tax === "INPP") {
      invoice.rate = inpp;
      invoice.amount = ((RBI * inpp) / 100).toString();
    }
  });

  // CASE IERE
  invoices.forEach((invoice) => {
    if (invoice.tax === "IERE") {
      invoice.rate = expat ? 25 : 0;
      invoice.amount = ((RBI * invoice.rate) / 100).toString();
    }
  });

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Taxes</TableHead>
          <TableHead>Taux</TableHead>
          <TableHead className="text-right">Montant</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.tax}>
            <TableCell className="font-medium">{invoice.tax}</TableCell>
            <TableCell className="font-semibold text-sky-800">
              {invoice.rate} %
            </TableCell>
            <TableCell className="text-right">$ {invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">
            $ {invoices.reduce((sum, item) => sum + +item.amount, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TaxesEmployeur;
