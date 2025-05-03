import {PropsWithChildren} from "react";

interface CorePageSectionProps extends PropsWithChildren {
  title?: string;
}

export const CorePageSection = ({children, title}: CorePageSectionProps) => {
  return (
    <section className="mb-8 last:mb-0">
      {title && (
        <header className="mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
        </header>
      )}
      {children}
    </section>
  );
};
