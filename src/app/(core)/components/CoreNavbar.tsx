import clsx from "clsx";
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
import Link from "next/link";

const mainNavbarItems: NavbarItemProps[] = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    isDisabled: true,
    label: "Dashboard",
  },
  {
    href: "/tracker",
    icon: LayoutList,
    label: "Registros de Despesas",
  },
  {
    href: "/planning",
    icon: NotebookPen,
    isDisabled: true,
    label: "Planejamento",
  },
  {
    href: "/reports",
    icon: FileText,
    isDisabled: true,
    label: "Relatórios",
  },
];

const footerNavbarItems: NavbarItemProps[] = [
  {
    href: "/about",
    icon: BadgeInfo,
    isDisabled: true,
    label: "Sobre",
  },
  {
    href: "/settings/account",
    icon: Settings,
    label: "Configurações",
  },
  {
    href: "/logout",
    icon: LogOut,
    isDisabled: true,
    label: "Sair",
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
    <nav className="fixed flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <header className="flex h-20 w-full items-center justify-center px-6">
        {/* <Image
          src="/assets/images/pork/hero_logo.png"
          alt="Global logo"
          width={64}
          height={64}
        /> */}
      </header>
      <div className="flex flex-1 flex-col justify-between p-2">
        <section>{renderNavbarItems(mainNavbarItems)}</section>
        <section>{renderNavbarItems(footerNavbarItems)}</section>
      </div>
    </nav>
  );
};

interface NavbarItemProps {
  href: string;
  icon: React.FC<LucideProps>;
  isActive?: boolean;
  isDisabled?: boolean;
  label: string;
}

const NavbarItem = ({
  href,
  icon: Icon,
  isActive = false,
  isDisabled = false,
  label,
}: NavbarItemProps) => (
  <Link href={isDisabled ? "#" : href}>
    <li
      className={clsx(
        "mt-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100",
        isActive && "bg-gray-100",
        isDisabled && "cursor-not-allowed text-gray-900/60"
      )}
    >
      <Icon className="size-5" />
      <span>{label}</span>
    </li>
  </Link>
);
