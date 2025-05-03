import {Divider} from "@/lib/ui/components/Divider";
import {CorePageHeader} from "../components/CorePageHeader";
import {CorePageSection} from "../components/CorePageSection";
import {RegisterAccountsDatagridCard} from "./components/RegisterAccountsDatagridCard";

const RegistersPage = () => {
  return (
    <>
      <CorePageHeader
        title="Cadastros"
        description="Gerencie seus cadastros de contas bancárias, cartões de crédito e categorias"
      />
      <CorePageSection title="Contas e formas de pagamento">
        <RegisterAccountsDatagridCard />
      </CorePageSection>
      <Divider className="mt-4 mb-6" />
      <CorePageSection title="Categorias">
        <RegisterAccountsDatagridCard />
      </CorePageSection>
    </>
  );
};

export default RegistersPage;
