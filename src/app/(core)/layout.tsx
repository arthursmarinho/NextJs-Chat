import {PropsWithChildren} from "react";
import {CoreNavbar} from "./components/CoreNavbar";
import {CoreHeader} from "./components/CoreHeader";

const CoreLayout = async ({children}: PropsWithChildren) => {
  return (
    <div className="size-full flex bg-neutral-50/50">
      <CoreNavbar />
      <div className="flex-col flex-1 ml-64">
        <CoreHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default CoreLayout;
