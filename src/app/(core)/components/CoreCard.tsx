import {PropsWithChildren, ReactNode} from "react";

interface CoreCardProps extends PropsWithChildren {
  actions?: ReactNode;
  title?: string;
}

export const CoreCard = ({actions, children, title}: CoreCardProps) => {
  return (
    <div className="min-h-10 rounded-lg border border-gray-200 bg-white">
      {(title || actions) && (
        <header className="flex items-center justify-between border-b border-gray-200 p-4">
          {title ? <h3 className="font-semibold">{title}</h3> : <span />}
          {actions && <div className="flex items-center">{actions}</div>}
        </header>
      )}
      <main>{children}</main>
    </div>
  );
};
