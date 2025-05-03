import type { Metadata } from "next";

import "@/lib/ui/styles/globals.css";
import { ApiClientGenerator } from "@/lib/shared/utils/ApiClientGenerator.utils";
import { DynamicApiRoutesGenerator } from "@/lib/shared/utils/DynamicApiRoutesGenerator.utils";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { JSX, PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Chat",
  title: "Super Chat",
};

if (process.env.NODE_ENV === "development") {
  ApiClientGenerator.generateApiClient();
  DynamicApiRoutesGenerator.generateDynamicRoutes();
}

const RootLayout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <html className="size-full" lang="en">
      <head />
      <body
        className={clsx(
          inter.className,
          "relative size-full bg-white antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
