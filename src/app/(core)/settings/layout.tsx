"use client";
import {queryClient} from "@/lib/ui/QueryClient";
import {store} from "@/lib/ui/store/store";
import {QueryClientProvider} from "@tanstack/react-query";
import {PropsWithChildren} from "react";
import {Provider as ReduxProvider} from "react-redux";

import {SettingsNavbar} from "./components/SettingsNavbar";

const SettingsLayout = ({children}: PropsWithChildren) => {
  return (
    <div className="flex w-full gap-3">
      <SettingsNavbar />
      <main className="flex-1">
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ReduxProvider>
      </main>
    </div>
  );
};

export default SettingsLayout;
