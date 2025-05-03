import clsx from "clsx";
import {
  ArrowDown01,
  ArrowDownAZ,
  ArrowUp01,
  ArrowUpZA,
  CalendarArrowDown,
  CalendarArrowUp,
  LucideProps,
} from "lucide-react";
import {FC, ReactNode} from "react";

type Value = string | number | boolean | Date | null | undefined;

type ColumnSortType = "text" | "number" | "date";

export interface DatagridColumn<TData extends DataWithId> {
  render?: (value: Value | Value[]) => ReactNode;
  header: ReactNode;
  accessor?: keyof TData | (keyof TData)[];
  sortable?: ColumnSortType;
}

type DataWithId = object & {id: string};

interface DatagridProps<TData extends DataWithId> {
  columns: DatagridColumn<TData>[];
  data: TData[];
}

const sharedTrClassNames = clsx(
  "hover:bg-muted/50 transition-colors ease-in-out duration-200"
);

const sharedTdClassNames = clsx("first:pl-4 last:pr-4 md:text-sm text-xs");

export const Datagrid = <TData extends DataWithId>({
  columns,
  data,
}: DatagridProps<TData>) => {
  return (
    <table className="w-full">
      <thead>
        <tr className={clsx(sharedTrClassNames)}>
          {columns.map((column) => (
            <th
              key={`th-${column.accessor as string}`}
              className={clsx(
                "text-left font-semibold text-gray-500 h-12",
                sharedTdClassNames
              )}
            >
              <span className="flex items-center gap-1">
                {column.header}
                {column.sortable && (
                  <SortIcon
                    type={column.sortable}
                    direction={column.sortable === "number" ? "asc" : "desc"}
                  />
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr
            key={`tr-${row.id}`}
            className={clsx(
              "border-t border-t-gray-200/70",
              sharedTrClassNames
            )}
          >
            {columns.map((column) => {
              let value: Value | Value[];

              if (!column.accessor) {
                return (
                  <td
                    key={`td-${row.id}-${column.header}`}
                    className={clsx("text-left h-14", sharedTdClassNames)}
                  >
                    {column.render ? column.render(null) : null}
                  </td>
                );
              }

              if (Array.isArray(column.accessor))
                value = column.accessor.map(
                  (accessor) => row[accessor] as Value
                );
              else value = row[column.accessor] as Value;

              return (
                <td
                  key={`td-${row.id}-${column.accessor as string}`}
                  className={clsx("text-left h-14", sharedTdClassNames)}
                >
                  {column.render
                    ? column.render(value as Value)
                    : value instanceof Date
                    ? "Date"
                    : value === true || value === false
                    ? "Boolean"
                    : value instanceof Array
                    ? "Array"
                    : value === null
                    ? "null"
                    : value === undefined
                    ? "undefined"
                    : (value as ReactNode)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface SortIconProps {
  direction: "asc" | "desc";
  type: ColumnSortType;
}

const SortIcon = ({type, direction}: SortIconProps) => {
  let Icon: FC<LucideProps> | null = null;

  if (type === "text") {
    Icon = direction === "asc" ? ArrowDownAZ : ArrowUpZA;
  } else if (type === "number" || type === "date") {
    Icon = direction === "asc" ? ArrowDown01 : ArrowUp01;
  }

  if (!Icon) {
    return null;
  }

  return <Icon className="size-4" />;
};
