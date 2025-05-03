import clsx from "clsx";
import Link from "next/link";
import {
  BadgeHelp,
  BadgeInfo,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LayoutList,
  LogOut,
  LucideProps,
  NotebookPen,
  Settings,
  SquarePen,
} from "lucide-react";

const mainNavbarItems: NavbarItemProps[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
    isDisabled: true,
  },
  {
    icon: LayoutList,
    label: "Registros de Despesas",
    href: "/tracker",
  },
  {
    icon: NotebookPen,
    label: "Planejamento",
    href: "/planning",
    isDisabled: true,
  },
  {
    icon: FileText,
    label: "Relatórios",
    href: "/reports",
    isDisabled: true,
  },
];

const footerNavbarItems: NavbarItemProps[] = [
  {
    icon: BadgeInfo,
    label: "Sobre",
    href: "/about",
    isDisabled: true,
  },
  {
    icon: Settings,
    label: "Configurações",
    href: "/settings/account",
  },
  {
    icon: LogOut,
    label: "Sair",
    href: "/logout",
    isDisabled: true,
  },
];

export const CoreNavbar = () => {
  const renderNavbarItems = (items: NavbarItemProps[]) => (
    <ul>
      {items.map((item) => (
        <NavbarItem key={item.label} {...item} />
      ))}
    </ul>
  );

  return (
    <nav className="w-64 border-r fixed border-gray-200 bg-white h-full flex flex-col">
      <header className="h-20 w-full flex justify-center items-center px-6">
        {/* <Image
          src="/assets/images/pork/hero_logo.png"
          alt="Global logo"
          width={64}
          height={64}
        /> */}
      </header>
      <div className="p-2 flex flex-col justify-between flex-1">
        <section>{renderNavbarItems(mainNavbarItems)}</section>
        <section>{renderNavbarItems(footerNavbarItems)}</section>
      </div>
    </nav>
  );
};

interface NavbarItemProps {
  icon: React.FC<LucideProps>;
  label: string;
  href: string;
  isActive?: boolean;
  isDisabled?: boolean;
}

const NavbarItem = ({
  icon: Icon,
  label,
  href,
  isActive = false,
  isDisabled = false,
}: NavbarItemProps) => (
  <Link href={isDisabled ? "#" : href}>
    <li
      className={clsx(
        "flex mt-2 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100",
        isActive && "bg-gray-100",
        isDisabled && "text-gray-900/60 cursor-not-allowed"
      )}
    >
      <Icon className="size-5" />
      <span>{label}</span>
    </li>
  </Link>
);
