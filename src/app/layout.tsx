import type {Metadata} from "next";

import "@/lib/ui/styles/globals.css";
import {DynamicApiRoutesGenerator} from "@/lib/shared/utils/DynamicApiRoutesGenerator.utils";
import clsx from "clsx";
import {Geist} from "next/font/google";
import {JSX, PropsWithChildren} from "react";
import {ApiClientGenerator} from "@/lib/shared/utils/ApiClientGenerator.utils";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  description: "Plataforma de gestão financeira",
  title: "Lil Pig Finanças",
};

if (process.env.NODE_ENV === "development") {
  ApiClientGenerator.generateApiClient();
  DynamicApiRoutesGenerator.generateDynamicRoutes();
}

const RootLayout = ({children}: PropsWithChildren): JSX.Element => {
  return (
    <html className="size-full" lang="en">
      <head />
      <body
        className={clsx(
          geistSans.variable,
          "relative size-full bg-white antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
