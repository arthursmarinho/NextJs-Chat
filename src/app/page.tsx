import {redirect} from "next/navigation";
import {JSX} from "react";

const IndexPage = (): JSX.Element => {
  redirect("/dashboard");
};

export default IndexPage;
