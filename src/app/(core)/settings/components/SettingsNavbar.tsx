import {Divider} from "@/lib/ui/components/Divider";
import clsx from "clsx";
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
import Link from "next/link";

type NavbarItemCategories = {
  items: NavbarItemProps[];
  label: string;
};

const navbarItems: NavbarItemCategories[] = [
  {
    items: [
      {
        href: "/settings/account",
        icon: UserIcon,
        label: "Perfil",
      },
      {
        href: "/settings/referrals",
        icon: MailsIcon,
        isDisabled: true,
        label: "Convites",
      },
      {
        href: "/settings/visual-accessibility",
        icon: PaletteIcon,
        isDisabled: true,
        label: "Visual e acessibilidade",
      },
      {
        href: "/settings/privacy",
        icon: LockIcon,
        isDisabled: true,
        label: "Privacidade e segurança",
      },
    ],
    label: "Geral",
  },
  {
    items: [
      {
        href: "/settings/register/accounts",
        icon: LandmarkIcon,
        isDisabled: true,
        label: "Contas bancárias e cartões",
      },
      {
        href: "/settings/register/categories",
        icon: FoldersIcon,
        isDisabled: true,
        label: "Categorias",
      },
    ],
    label: "Cadastros",
  },
  {
    items: [
      {
        href: "/settings/integrations/whatsapp-telegram",
        icon: MessageCircleIcon,
        isDisabled: true,
        label: "Whatsapp e Telegram",
      },
      {
        href: "/settings/integrations/ai-assistant",
        icon: SparklesIcon,
        isDisabled: true,
        label: "Assistente IA",
      },
    ],
    label: "Integrações",
  },
];

export const SettingsNavbar = () => {
  const renderNavbarItems = (categories: NavbarItemCategories[]) => (
    <>
      {categories.map((category: NavbarItemCategories) => (
        <div
          className="mb-2 border-b border-gray-200 pb-2 last:border-b-0"
          key={category.label}
        >
          <span className="px-3 pb-2 text-xs font-medium text-black/70">
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
    <nav className="flex w-60 flex-col">
      <div className="flex flex-1 flex-col justify-between p-2">
        <section>{renderNavbarItems(navbarItems)}</section>
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
        "font mt-1 flex items-center gap-2 rounded-md px-3 py-1 text-sm text-black/80 hover:bg-gray-100",
        isActive && "bg-gray-100",
        isDisabled && "cursor-not-allowed text-gray-900/60"
      )}
    >
      <Icon className="size-3" />
      <span>{label}</span>
    </li>
  </Link>
);
