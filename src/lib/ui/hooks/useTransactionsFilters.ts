import {$Enums, Prisma} from "@prisma/client";
import {endOfMonth, startOfMonth} from "date-fns";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "../store/store";
import {
  setFilters,
  setPagination,
  TransactionsState,
} from "../store/transactionsSlice";
import useDate from "./useDate";

interface UseTransactionsFiltersData {
  filters: TransactionsState["filters"];
  pagination: TransactionsState["pagination"];
  setFilters: (filters: TransactionsState["filters"]) => void;
  setPagination: (pagination: TransactionsState["pagination"]) => void;
}

export const useTransactionsFilters = (): UseTransactionsFiltersData => {
  const {currentDate} = useDate();

  const dispatch = useDispatch();
  const {filters, pagination}: TransactionsState = useSelector(
    (state: RootState) => state.transactions
  );
  useEffect(() => {
    if (!filters) {
      dispatch(
        setFilters({
          endDate: endOfMonth(currentDate).toISOString(),
          paymentMethod: [$Enums.PaymentMethodEnum.ACCOUNT],
          startDate: startOfMonth(currentDate).toISOString(),
        })
      );
    }

    dispatch(
      setPagination({
        ...pagination,
        sort: [{field: "date", order: Prisma.SortOrder.desc}],
      })
    );
  }, []);

  return {
    filters,
    pagination,
    setFilters: (filters) => dispatch(setFilters(filters)),
    setPagination: (pagination) => dispatch(setPagination(pagination)),
  };
};
