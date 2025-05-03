"use client";
import {PropsWithChildren} from "react";
import {SettingsNavbar} from "./components/SettingsNavbar";
import {queryClient} from "@/lib/ui/QueryClient";
import {store} from "@/lib/ui/store/store";
import {QueryClientProvider} from "@tanstack/react-query";
import {Provider as ReduxProvider} from "react-redux";

const SettingsLayout = ({children}: PropsWithChildren) => {
  return (
    <div className="flex gap-3 w-full">
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
