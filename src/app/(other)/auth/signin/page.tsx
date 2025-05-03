// import {JSX} from "react";

import {SignInContent} from "./components/SignInContent";
import {SignInHero} from "./components/SignInHero";

const SignInPage = async () => {
  return (
    <div className="grid size-full items-center justify-center !bg-white xl:grid-cols-2">
      <SignInHero />
      <SignInContent />
    </div>
  );
};

export default SignInPage;
