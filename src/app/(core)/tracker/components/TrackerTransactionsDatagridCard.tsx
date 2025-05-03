import {DatagridColumn} from "@/lib/ui/components/Datagrid";
import clsx from "clsx";
import Money from "@/lib/ui/components/Money";
import {CorePageSection} from "../../components/CorePageSection";
import {CoreDatagridCard} from "../../components/CoreDatagridCard";
import {Button} from "@/lib/ui/components/Button";
import {DownloadIcon, FunnelIcon} from "lucide-react";

interface Transaction {
  id: string;
  date: Date;
  category: string;
  account: string;
  paymentMethod: string;
  keyword?: string;
  instalment?: number;
  amount: number;
  status: "paid" | "pending";
  totalInstalment?: number;
}

const mockedTransactions: Transaction[] = [
  {
    id: "1",
    date: new Date("2023-10-01"),
    category: "Moradia",
    account: "Santander",
    paymentMethod: "Cartão de Crédito",
    amount: 100,
    status: "paid",
    keyword: "Aluguel",
  },
  {
    id: "2",
    date: new Date("2023-10-01"),
    category: "Transporte",
    account: "Itaú",
    paymentMethod: "Dinheiro",
    amount: -50,
    status: "pending",
    instalment: 1,
    totalInstalment: 3,
    keyword: "Gasolina",
  },
  {
    id: "3",
    date: new Date("2023-10-01"),
    category: "Moradia",
    account: "Santander",
    paymentMethod: "Cartão de Crédito",
    amount: 100,
    status: "paid",
    keyword: "Aluguel",
  },
  {
    id: "4",
    date: new Date("2023-10-01"),
    category: "Transporte",
    account: "Itaú",
    paymentMethod: "Dinheiro",
    amount: 50,
    status: "pending",
    keyword: "Gasolina",
  },
  {
    id: "5",
    date: new Date("2023-10-01"),
    category: "Moradia",
    account: "Santander",
    paymentMethod: "Cartão de Crédito",
    amount: -100,
    status: "pending",
  },
  {
    id: "6",
    date: new Date("2023-10-01"),
    category: "Transporte",
    account: "Itaú",
    paymentMethod: "Dinheiro",
    amount: -50,
    status: "pending",
    keyword: "Manutenção",
  },
];

const columns: DatagridColumn<Transaction>[] = [
  {
    header: "Data",
    accessor: "date",
    sortable: "date",
    render: (value) => (
      <span className="font-medium">
        {(value as Date).toLocaleDateString("pt-BR")}
      </span>
    ),
  },
  {
    header: "Categoria",
    accessor: ["category", "keyword"],
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
    header: "Conta",
    accessor: ["account", "paymentMethod", "instalment", "totalInstalment"],
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
    header: "Status",
    accessor: "status",
    render: (value) => (
      <span
        className={clsx(
          "px-2 py-1 rounded-md text-xs font-semibold",
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
    header: "Valor",
    accessor: "amount",
    render: (value) => <Money amount={value as number} />,
  },
];

export const TrackerTransactionsDatagridCard = () => {
  return (
    <CorePageSection>
      <CoreDatagridCard
        title="Transações"
        columns={columns}
        data={mockedTransactions}
        actions={<TransactionsDatagridActions />}
      />
    </CorePageSection>
  );
};

export const TransactionsDatagridActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Button isDisabled className="btn btn-primary" Icon={FunnelIcon}>
        Filtrar
      </Button>
      <Button isDisabled className="btn btn-secondary" Icon={DownloadIcon}>
        Exportar
      </Button>
    </div>
  );
};
