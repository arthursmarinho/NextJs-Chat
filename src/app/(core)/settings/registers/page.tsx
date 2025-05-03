import {Divider} from "@/lib/ui/components/Divider";

import {CorePageHeader} from "../components/CorePageHeader";
import {CorePageSection} from "../components/CorePageSection";
import {RegisterAccountsDatagridCard} from "./components/RegisterAccountsDatagridCard";

const RegistersPage = () => {
  return (
    <>
      <CorePageHeader
        description="Gerencie seus cadastros de contas bancárias, cartões de crédito e categorias"
        title="Cadastros"
      />
      <CorePageSection title="Contas e formas de pagamento">
        <RegisterAccountsDatagridCard />
      </CorePageSection>
      <Divider className="mb-6 mt-4" />
      <CorePageSection title="Categorias">
        <RegisterAccountsDatagridCard />
      </CorePageSection>
    </>
  );
};

export default RegistersPage;
