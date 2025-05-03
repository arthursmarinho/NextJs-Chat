import {Datagrid, DatagridColumn} from "@/lib/ui/components/Datagrid";
import {ComponentProps} from "react";

import {CoreCard} from "./CoreCard";

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
      <footer className="flex items-center justify-between border-t border-gray-200 p-4">
        <p className="text-sm">Mostrando 5 de 150</p>
      </footer>
    </CoreCard>
  );
};
