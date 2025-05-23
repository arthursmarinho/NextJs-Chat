import clsx from "clsx";
import Image from "next/image";
import {ComponentProps, JSX} from "react";

export type CustomIconName = "google-sso";

interface CustomIconProps extends Partial<ComponentProps<typeof Image>> {
  name?: CustomIconName;
}

export const CustomIcon = ({className, name, ...props}: CustomIconProps) => {
  if (!name) return null;

  return (
    <div className={clsx("relative", className)}>
      <Image {...props} alt={name} fill src={`/assets/svgs/${name}.svg`} />
    </div>
  );
};

export const GoogleSSOIcon = (props: Omit<CustomIconProps, "name">) => (
  <CustomIcon {...props} name="google-sso" />
);
