import clsx from "clsx";
import Link from "next/link";
import {
  BadgeHelp,
  BadgeInfo,
  FileText,
  FoldersIcon,
  LandmarkIcon,
  LayoutDashboard,
  LayoutList,
  LockIcon,
  LogOut,
  LucideProps,
  MailsIcon,
  MessageCircleIcon,
  NotebookPen,
  PaletteIcon,
  Settings,
  SparklesIcon,
  UserIcon,
} from "lucide-react";
import {Divider} from "@/lib/ui/components/Divider";

type NavbarItemCategories = {
  label: string;
  items: NavbarItemProps[];
};

const navbarItems: NavbarItemCategories[] = [
  {
    label: "Geral",
    items: [
      {
        icon: UserIcon,
        label: "Perfil",
        href: "/settings/account",
      },
      {
        icon: MailsIcon,
        label: "Convites",
        href: "/settings/referrals",
        isDisabled: true,
      },
      {
        icon: PaletteIcon,
        label: "Visual e acessibilidade",
        href: "/settings/visual-accessibility",
        isDisabled: true,
      },
      {
        icon: LockIcon,
        label: "Privacidade e segurança",
        href: "/settings/privacy",
        isDisabled: true,
      },
    ],
  },
  {
    label: "Cadastros",
    items: [
      {
        icon: LandmarkIcon,
        label: "Contas bancárias e cartões",
        href: "/settings/register/accounts",
        isDisabled: true,
      },
      {
        icon: FoldersIcon,
        label: "Categorias",
        href: "/settings/register/categories",
        isDisabled: true,
      },
    ],
  },
  {
    label: "Integrações",
    items: [
      {
        icon: MessageCircleIcon,
        label: "Whatsapp e Telegram",
        href: "/settings/integrations/whatsapp-telegram",
        isDisabled: true,
      },
      {
        icon: SparklesIcon,
        label: "Assistente IA",
        href: "/settings/integrations/ai-assistant",
        isDisabled: true,
      },
    ],
  },
];

export const SettingsNavbar = () => {
  const renderNavbarItems = (categories: NavbarItemCategories[]) => (
    <>
      {categories.map((category: NavbarItemCategories) => (
        <div
          className="mb-2 pb-2 border-b border-gray-200 last:border-b-0"
          key={category.label}
        >
          <span className="px-3 text-black/70 text-xs font-medium pb-2">
            {category.label}
          </span>
          <ul>
            {category.items.map((item: NavbarItemProps) => (
              <NavbarItem key={item.label} {...item} />
            ))}
          </ul>
        </div>
      ))}
    </>
  );

  return (
    <nav className="w-60 flex flex-col">
      <div className="p-2 flex flex-col justify-between flex-1">
        <section>{renderNavbarItems(navbarItems)}</section>
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
        "flex mt-1 items-center gap-2 rounded-md px-3 py-1 text-sm font text-black/80 hover:bg-gray-100",
        isActive && "bg-gray-100",
        isDisabled && "text-gray-900/60 cursor-not-allowed"
      )}
    >
      <Icon className="size-3" />
      <span>{label}</span>
    </li>
  </Link>
);
