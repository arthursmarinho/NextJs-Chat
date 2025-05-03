import clsx from "clsx";
import {LucideProps} from "lucide-react";
import {ButtonHTMLAttributes, ComponentProps, FC, JSX} from "react";
import {CustomIcon} from "./Icon";

type ButtonVariant = "outline" | "sso";

const variants: Record<ButtonVariant, string> = {
  outline: clsx(
    "rounded-md border text-sm font-medium border-gray-200 bg-white p-2 text-black/80 hover:border-black hover:bg-slate-50 hover:text-black"
  ),
  sso: clsx(
    "gap-3 rounded-full border border-slate-400 bg-white px-6 py-2 font-semibold hover:bg-slate-50"
  ),
};

const iconVariant: Record<ButtonVariant, string> = {
  outline: clsx("size-4"),
  sso: clsx("size-5"),
};

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  Icon?: FC<LucideProps> | FC<ComponentProps<typeof CustomIcon>>;
  variant?: ButtonVariant;
  isDisabled?: boolean;
}

export const Button = ({
  children,
  Icon: IconComponent,
  variant = "outline",
  isDisabled,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={clsx(
        variants[variant],
        "flex items-center justify-center transition-all duration-300 ease-in-out",
        isDisabled && "cursor-not-allowed opacity-80 hover:border-inherit",
        props.className
      )}
    >
      {IconComponent && (
        <IconComponent className={clsx(iconVariant[variant], "mr-1.5")} />
      )}{" "}
      {children}
    </button>
  );
};
