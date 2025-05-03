import {Eye} from "lucide-react";
import Image from "next/image";

export const CoreHeader = () => {
  return (
    <header className="flex flex-1 items-center justify-between border-b border-gray-200 bg-white px-6 py-4 h-17">
      <div />
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <p className="font-medium text-right">Leonardo Marinho</p>
            <p className="text-xs text-gray-500">
              leonardomarinhosan@gmail.com
            </p>
          </div>
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              alt="User avatar"
              width="32"
              height="32"
              data-nimg="1"
              className="h-full w-full object-cover"
              src="/assets/images/pork/pork_profile.jpg"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
