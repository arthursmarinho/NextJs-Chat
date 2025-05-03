import {Divider} from "@/lib/ui/components/Divider";

interface CorePageHeaderProps {
  title: string;
  description?: string;
}

export const CorePageHeader = ({title, description}: CorePageHeaderProps) => {
  return (
    <>
      <header>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </header>
      <Divider className="mt-2 mb-8" />
    </>
  );
};
