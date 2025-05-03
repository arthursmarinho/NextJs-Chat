import Image from "next/image";
import {JSX} from "react";

export const SignInHero = (): JSX.Element => {
  return (
    <div className="relative hidden xl:relative xl:block xl:size-full xl:p-8">
      <div className="relative size-full">
        <Image
          alt="Login Hero"
          className="rounded-lg object-cover xl:rounded-3xl"
          fill
          src={"/assets/images/hero.jpg"}
        />
      </div>
    </div>
  );
};
