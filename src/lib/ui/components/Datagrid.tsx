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

type Value = boolean | Date | null | number | string | undefined;

type ColumnSortType = "date" | "number" | "text";

export interface DatagridColumn<TData extends DataWithId> {
  accessor?: (keyof TData)[] | keyof TData;
  header: ReactNode;
  render?: (value: Value | Value[]) => ReactNode;
  sortable?: ColumnSortType;
}

type DataWithId = {id: string} & object;

interface DatagridProps<TData extends DataWithId> {
  columns: DatagridColumn<TData>[];
  data: TData[];
}

const sharedTrClassNames = clsx(
  "transition-colors duration-200 ease-in-out hover:bg-muted/50"
);

const sharedTdClassNames = clsx("text-xs first:pl-4 last:pr-4 md:text-sm");

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
              className={clsx(
                "h-12 text-left font-semibold text-gray-500",
                sharedTdClassNames
              )}
              key={`th-${column.accessor as string}`}
            >
              <span className="flex items-center gap-1">
                {column.header}
                {column.sortable && (
                  <SortIcon
                    direction={column.sortable === "number" ? "asc" : "desc"}
                    type={column.sortable}
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
            className={clsx(
              "border-t border-t-gray-200/70",
              sharedTrClassNames
            )}
            key={`tr-${row.id}`}
          >
            {columns.map((column) => {
              let value: Value | Value[];

              if (!column.accessor) {
                return (
                  <td
                    className={clsx("h-14 text-left", sharedTdClassNames)}
                    key={`td-${row.id}-${column.header}`}
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
                  className={clsx("h-14 text-left", sharedTdClassNames)}
                  key={`td-${row.id}-${column.accessor as string}`}
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

const SortIcon = ({direction, type}: SortIconProps) => {
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
