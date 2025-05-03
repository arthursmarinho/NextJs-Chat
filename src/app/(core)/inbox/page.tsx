"use client";

import {queryClient} from "@/lib/ui/QueryClient";
import {store} from "@/lib/ui/store/store";
import {QueryClientProvider} from "@tanstack/react-query";
import {Provider as ReduxProvider} from "react-redux";

import {InboxChat} from "./components/InboxChat";
import {InboxMe} from "./components/InboxMe";
import {InboxUsersList} from "./components/InboxUsersList";

const InboxPage = () => {
  return (
    <div className="flex size-full items-center justify-center bg-slate-200">
      <div className="flex h-[720px] w-[1240px] rounded-lg bg-white">
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <div className="flex h-full w-96 flex-col p-4">
              <h1 className="flex h-20 items-center border-b border-b-neutral-200 pl-4 text-2xl font-semibold text-neutral-600">
                Chat
              </h1>
              <InboxMe />
              <InboxUsersList />
            </div>
            <div className="flex-1 p-4">
              <InboxChat />
            </div>
          </QueryClientProvider>
        </ReduxProvider>
      </div>
    </div>
  );
};

export default InboxPage;
