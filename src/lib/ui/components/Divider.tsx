import clsx from "clsx";
import {JSX} from "react";

interface DividerProps {
  className?: string;
}

export const Divider = ({className}: DividerProps): JSX.Element => {
  return (
    <div
      className={clsx("relative flex items-center justify-center", className)}
    >
      <div className="absolute inset-x-0 h-px bg-slate-200" />
    </div>
  );
};
