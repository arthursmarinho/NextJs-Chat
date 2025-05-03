import {TransactionCategory} from "@prisma/client";
import {useQuery} from "@tanstack/react-query";
import {isNil} from "lodash";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {SelectOption} from "../components/ui/select";
import TransactionCategoryApiService from "../services/TransactionCategoryApi.service";
import {RootState} from "../store/store";
import {
  setTransactionCategories,
  TransactionCategoriesState,
} from "../store/transactionCategoriesSlice";

interface UseTransactionCategoriesData {
  expenseTransactionCategories: TransactionCategoriesState["expenseTransactionCategories"];
  getSelectOptions: (type: "all" | "expense" | "income") => SelectOption[];
  incomingTransactionCategories: TransactionCategoriesState["incomingTransactionCategories"];
  transactionCategories: TransactionCategoriesState["transactionCategories"];
}

export const useTransactionCategories = (): UseTransactionCategoriesData => {
  const dispatch = useDispatch();
  const {
    expenseTransactionCategories,
    incomingTransactionCategories,
    transactionCategories,
  }: TransactionCategoriesState = useSelector(
    (state: RootState) => state.transactionCategories
  );

  const getTransactionCategoriesQuery = useQuery({
    enabled: !transactionCategories?.length,
    queryFn: () => TransactionCategoryApiService.getTransactionCategories(),
    queryKey: ["getTransactionCategories"],
    staleTime: 5000,
  });

  useEffect(() => {
    const {data, error, isLoading} = getTransactionCategoriesQuery;

    if (error || isLoading || isNil(data)) return;

    dispatch(setTransactionCategories(data));
  }, [
    getTransactionCategoriesQuery.isLoading,
    getTransactionCategoriesQuery.data,
  ]);

  const getSelectOptions = (
    type: "all" | "expense" | "income"
  ): SelectOption[] => {
    const transactionCategoriesFiltered: TransactionCategory[] = (
      type === "all"
        ? transactionCategories
        : type === "expense"
        ? expenseTransactionCategories
        : incomingTransactionCategories
    ) as TransactionCategory[];

    return (
      transactionCategoriesFiltered?.map(
        (transactionCategory: TransactionCategory) => ({
          label: transactionCategory.name,
          value: String(transactionCategory.id),
        })
      ) || []
    );
  };

  return {
    expenseTransactionCategories,
    getSelectOptions,
    incomingTransactionCategories,
    transactionCategories,
  };
};
