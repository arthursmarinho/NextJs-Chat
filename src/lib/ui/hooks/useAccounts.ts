import {useQuery} from "@tanstack/react-query";
import {isNil} from "lodash";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {SelectOption} from "../components/ui/select";
import AccountApiService from "../services/AccountApi.service";
import {AccountsState, setAccounts} from "../store/accountsSlice";
import {RootState} from "../store/store";

interface UseAccountsData {
  accounts: AccountsState["accounts"];
  getSelectOptions: () => SelectOption[];
}

export const useAccounts = (): UseAccountsData => {
  const dispatch = useDispatch();
  const {accounts}: AccountsState = useSelector(
    (state: RootState) => state.accounts
  );

  const getAccountsQuery = useQuery({
    enabled: !accounts?.length,
    queryFn: () => AccountApiService.getAccounts(),
    queryKey: ["getAccounts"],
    staleTime: 5000,
  });

  useEffect(() => {
    const {data, error, isLoading} = getAccountsQuery;

    if (error || isLoading || isNil(data)) return;

    dispatch(setAccounts(data));
  }, [getAccountsQuery.isLoading, getAccountsQuery.data]);

  const getSelectOptions = (): SelectOption[] =>
    accounts?.map((account) => ({
      label: account.name,
      value: String(account.id),
    })) || [];

  return {
    accounts,
    getSelectOptions,
  };
};
