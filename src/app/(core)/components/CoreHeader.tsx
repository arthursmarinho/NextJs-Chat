import {Eye} from "lucide-react";
import Image from "next/image";

export const CoreHeader = () => {
  return (
    <header className="flex h-17 flex-1 items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div />
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <p className="text-right font-medium">Leonardo Marinho</p>
            <p className="text-xs text-gray-500">
              leonardomarinhosan@gmail.com
            </p>
          </div>
          <div className="relative size-8 overflow-hidden rounded-full">
            <Image
              alt="User avatar"
              className="size-full object-cover"
              data-nimg="1"
              height="32"
              src="/assets/images/pork/pork_profile.jpg"
              width="32"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
