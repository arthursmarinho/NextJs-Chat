import {PropsWithChildren, ReactNode} from "react";

interface CoreCardProps extends PropsWithChildren {
  title?: string;
  actions?: ReactNode;
}

export const CoreCard = ({title, actions, children}: CoreCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white min-h-10">
      {(title || actions) && (
        <header className="p-4 flex items-center justify-between border-b border-gray-200">
          {title ? <h3 className="font-semibold">{title}</h3> : <span />}
          {actions && <div className="flex items-center">{actions}</div>}
        </header>
      )}
      <main>{children}</main>
    </div>
  );
};
