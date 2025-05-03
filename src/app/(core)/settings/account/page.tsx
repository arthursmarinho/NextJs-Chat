"use client";
import {useAuthentication} from "@/lib/ui/hooks/firebase/useAuthentication";

import {CorePageHeader} from "../../components/CorePageHeader";
import {CorePageSection} from "../../components/CorePageSection";

const SettingsPage = () => {
  const {getCurrentUser} = useAuthentication();
  // const user = getCurrentUser();

  console.log("SettingsPage");

  return (
    <>
      <CorePageHeader
        description="Gerencie suas configurações de conta, notificações, cadastros e preferências"
        title="Configurações de conta"
      />
      <CorePageSection></CorePageSection>
    </>
  );
};

export default SettingsPage;
