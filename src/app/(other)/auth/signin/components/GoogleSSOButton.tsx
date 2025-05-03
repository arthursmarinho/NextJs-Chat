"use client";
import {Button} from "@/lib/ui/components/Button";
import {CustomIcon, GoogleSSOIcon} from "@/lib/ui/components/Icon";
import {useAuthentication} from "@/lib/ui/hooks/firebase/useAuthentication";
import {queryClient} from "@/lib/ui/QueryClient";
import {store} from "@/lib/ui/store/store";
import {QueryClientProvider} from "@tanstack/react-query";
import {JSX} from "react";
import {Provider as ReduxProvider} from "react-redux";

const GoogleSSOButtonClient = (): JSX.Element => {
  const {signInWithGoogle} = useAuthentication();

  const handleClick = async (): Promise<void> => {
    await signInWithGoogle();
  };

  return (
    <Button
      className="w-full"
      Icon={GoogleSSOIcon}
      onClick={handleClick}
      variant="sso"
    >
      Continuar com Google
    </Button>
  );
};

export const GoogleSSOButton = (): JSX.Element => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleSSOButtonClient />
      </QueryClientProvider>
    </ReduxProvider>
  );
};
