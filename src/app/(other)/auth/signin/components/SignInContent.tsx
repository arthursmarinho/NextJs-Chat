import {Divider} from "@/lib/ui/components/Divider";
import Image from "next/image";
import {JSX} from "react";

import {GoogleSSOButton} from "./GoogleSSOButton";

export const SignInContent = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex w-[400px] flex-col bg-white">
        <header className="mb-8 flex flex-col items-center gap-10">
          <div className="relative aspect-[1.55] w-3/5">
            <Image
              alt="Hero logo"
              fill
              src="/assets/images/pork/hero_logo.png"
            />
          </div>
          <div className="w-full space-y-1">
            <h1 className="text-2xl font-bold">Entre na plataforma</h1>
            <h2>Faça login utilizando sua conta Google</h2>
          </div>
        </header>
        <main className="mb-8">
          <div className="w-full">
            <GoogleSSOButton />
          </div>
        </main>
        <Divider />
        <footer className="mt-4">
          <p className="text-sm">
            Esta é uma plataforma fechada, em desenvolvimento e apenas para
            convidados. Nenhuma garantia é dada quanto à segurança ou
            privacidade dos dados.
          </p>
        </footer>
      </div>
    </div>
  );
};
