import clsx from "clsx";
import {LucideProps} from "lucide-react";
import {ButtonHTMLAttributes, ComponentProps, FC, JSX} from "react";

import {CustomIcon} from "./Icon";

type ButtonVariant = "outline" | "sso";

const variants: Record<ButtonVariant, string> = {
  outline: clsx(
    "rounded-md border border-gray-200 bg-white p-2 text-sm font-medium text-black/80 hover:border-black hover:bg-slate-50 hover:text-black"
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
  Icon?: FC<ComponentProps<typeof CustomIcon>> | FC<LucideProps>;
  isDisabled?: boolean;
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  Icon: IconComponent,
  isDisabled,
  variant = "outline",
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      className={clsx(
        variants[variant],
        "flex items-center justify-center transition-all duration-300 ease-in-out",
        isDisabled && "cursor-not-allowed opacity-80 hover:border-inherit",
        props.className
      )}
      disabled={isDisabled}
    >
      {IconComponent && (
        <IconComponent className={clsx(iconVariant[variant], "mr-1.5")} />
      )}{" "}
      {children}
    </button>
  );
};
