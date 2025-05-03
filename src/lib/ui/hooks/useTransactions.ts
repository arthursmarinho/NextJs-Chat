import {useQuery} from "@tanstack/react-query";
import {isNil} from "lodash";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import TransactionApiService from "../services/TransactionApi.service";
import {RootState} from "../store/store";
import {setTransactions, TransactionsState} from "../store/transactionsSlice";

interface UseTransactionsData {
  transactions: TransactionsState["transactions"];
}

export const useTransactions = (): UseTransactionsData => {
  const dispatch = useDispatch();
  const {filters, pagination, transactions}: TransactionsState = useSelector(
    (state: RootState) => state.transactions
  );

  const getTransactionsQuery = useQuery({
    enabled: !!filters && !!pagination,
    queryFn: () => TransactionApiService.getTransactions({filters, pagination}),
    queryKey: ["getTransactions", filters, pagination],
    staleTime: 5000,
  });

  useEffect(() => {
    const {data, error, isLoading} = getTransactionsQuery;

    if (error || isLoading || isNil(data)) return;

    dispatch(setTransactions(data));
  }, [getTransactionsQuery.isLoading, getTransactionsQuery.data]);

  useEffect(() => {
    if (!filters || !pagination) return;

    getTransactionsQuery.refetch();
  }, [filters, pagination]);

  return {
    transactions,
  };
};
