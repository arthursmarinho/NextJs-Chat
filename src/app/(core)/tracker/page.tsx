import {CorePageHeader} from "../components/CorePageHeader";
import {TrackerTransactionsDatagridCard} from "./components/TrackerTransactionsDatagridCard";

const TrackerPage = async () => {
  return (
    <>
      <CorePageHeader
        description="Cadastre suas entradas e saídas financeiras para acompanhar seu fluxo de caixa"
        title="Registro de Transacões"
      />
      <div className="flex gap-4">
        <div className="flex-[5]">
          <TrackerTransactionsDatagridCard />
        </div>
        {/* <div className="flex-[3] border-l pl-4 border-gray-100">
          <CorePageSection>
            <CoreDatagridCard
              title="Categorias"
              columns={columns}
              data={mockedTransactions}
            />
          </CorePageSection>
        </div> */}
      </div>
    </>
  );
};

export default TrackerPage;
