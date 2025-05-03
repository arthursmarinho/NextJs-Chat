import {Divider} from "@/lib/ui/components/Divider";

interface CorePageHeaderProps {
  description?: string;
  title: string;
}

export const CorePageHeader = ({description, title}: CorePageHeaderProps) => {
  return (
    <>
      <header>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </header>
      <Divider className="mb-8 mt-2" />
    </>
  );
};
