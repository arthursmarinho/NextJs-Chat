import {PropsWithChildren} from "react";

import {CoreHeader} from "./components/CoreHeader";
import {CoreNavbar} from "./components/CoreNavbar";

const CoreLayout = async ({children}: PropsWithChildren) => {
  return (
    <div className="flex size-full bg-neutral-50/50">
      <CoreNavbar />
      <div className="ml-64 flex-1 flex-col">
        <CoreHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default CoreLayout;
