import {ComponentProps} from "react";
import {CoreCard} from "./CoreCard";
import {Datagrid, DatagridColumn} from "@/lib/ui/components/Datagrid";

interface CoreDatagridCard
  extends ComponentProps<typeof CoreCard>,
    ComponentProps<typeof Datagrid> {}

export const CoreDatagridCard = ({
  columns,
  data,
  ...coreCardProps
}: CoreDatagridCard) => {
  return (
    <CoreCard {...coreCardProps}>
      <Datagrid columns={columns} data={data} />
      <footer className="flex justify-between items-center p-4 border-t border-gray-200">
        <p className="text-sm">Mostrando 5 de 150</p>
      </footer>
    </CoreCard>
  );
};
