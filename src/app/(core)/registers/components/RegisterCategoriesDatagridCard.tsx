import {Button} from "@/lib/ui/components/Button";
import {DatagridColumn} from "@/lib/ui/components/Datagrid";
import Money from "@/lib/ui/components/Money";
import clsx from "clsx";
import {CirclePlusIcon} from "lucide-react";

import {CoreDatagridCard} from "../../components/CoreDatagridCard";
import {CorePageSection} from "../../components/CorePageSection";

interface Transaction {
  account: string;
  amount: number;
  category: string;
  date: Date;
  id: string;
  instalment?: number;
  keyword?: string;
  paymentMethod: string;
  status: "paid" | "pending";
  totalInstalment?: number;
}

const mockedTransactions: Transaction[] = [
  {
    account: "Santander",
    amount: 100,
    category: "Moradia",
    date: new Date("2023-10-01"),
    id: "1",
    keyword: "Aluguel",
    paymentMethod: "Cartão de Crédito",
    status: "paid",
  },
  {
    account: "Itaú",
    amount: -50,
    category: "Transporte",
    date: new Date("2023-10-01"),
    id: "2",
    instalment: 1,
    keyword: "Gasolina",
    paymentMethod: "Dinheiro",
    status: "pending",
    totalInstalment: 3,
  },
  {
    account: "Santander",
    amount: 100,
    category: "Moradia",
    date: new Date("2023-10-01"),
    id: "3",
    keyword: "Aluguel",
    paymentMethod: "Cartão de Crédito",
    status: "paid",
  },
  {
    account: "Itaú",
    amount: 50,
    category: "Transporte",
    date: new Date("2023-10-01"),
    id: "4",
    keyword: "Gasolina",
    paymentMethod: "Dinheiro",
    status: "pending",
  },
  {
    account: "Santander",
    amount: -100,
    category: "Moradia",
    date: new Date("2023-10-01"),
    id: "5",
    paymentMethod: "Cartão de Crédito",
    status: "pending",
  },
  {
    account: "Itaú",
    amount: -50,
    category: "Transporte",
    date: new Date("2023-10-01"),
    id: "6",
    keyword: "Manutenção",
    paymentMethod: "Dinheiro",
    status: "pending",
  },
];

const columns: DatagridColumn<Transaction>[] = [
  {
    accessor: "date",
    header: "Data",
    render: (value) => (
      <span className="font-medium">
        {(value as Date).toLocaleDateString("pt-BR")}
      </span>
    ),
    sortable: "date",
  },
  {
    accessor: ["category", "keyword"],
    header: "Categoria",
    render(value) {
      const [category, keyword] = value as string[];

      return (
        <div className="flex flex-col gap-1">
          <span>{category}</span>
          {keyword && <span className="text-black/60">{keyword}</span>}
        </div>
      );
    },
  },
  {
    accessor: ["account", "paymentMethod", "instalment", "totalInstalment"],
    header: "Conta",
    render: (value) => {
      const [account, paymentMethod, instalment, totalInstalment] =
        value as string[];

      return (
        <div className="flex flex-col gap-1">
          <span>{account}</span>
          <span className="text-black/60">
            {paymentMethod}{" "}
            {instalment && totalInstalment && (
              <span>{` (${instalment}/${totalInstalment})`}</span>
            )}
          </span>
        </div>
      );
    },
  },
  {
    accessor: "status",
    header: "Status",
    render: (value) => (
      <span
        className={clsx(
          "rounded-md px-2 py-1 text-xs font-semibold",
          value === "paid" ? "bg-green-100" : "bg-orange-100"
        )}
      >
        {value === "paid" ? (
          <span className="text-green-700">Pago</span>
        ) : (
          <span className="text-orange-700">Pendente</span>
        )}
      </span>
    ),
  },
  {
    accessor: "amount",
    header: "Valor",
    render: (value) => <Money amount={value as number} />,
  },
];

export const RegisterCategoriesDatagridCard = () => {
  return (
    <CoreDatagridCard
      actions={<TransactionsDatagridActions />}
      columns={columns}
      data={mockedTransactions}
    />
  );
};

export const TransactionsDatagridActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Button className="btn btn-primary" Icon={CirclePlusIcon} isDisabled>
        Adicionar registro
      </Button>
    </div>
  );
};
