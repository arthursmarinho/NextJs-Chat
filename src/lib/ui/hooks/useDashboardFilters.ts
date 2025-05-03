"use client";

import {$Enums} from "@prisma/client";
import {endOfMonth, startOfMonth} from "date-fns";
import {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
  DashboardState,
  DashboardViewMode,
  setDateViewFilter,
  setViewMode,
} from "../store/dashboardSlice";
import {RootState} from "../store/store";
import useDate from "./useDate";
import {useTransactionsFilters} from "./useTransactionsFilters";

interface UseDashboardFiltersData {
  dateViewFilter?: Date;
  setDateViewFilter: (date: Date) => void;
  setViewMode: (viewMode: DashboardViewMode) => void;
  viewMode: DashboardViewMode;
}

export const useDashboardFilters = (): UseDashboardFiltersData => {
  const {currentDate} = useDate();

  const {filters: transactionsFilters, setFilters: setTransactionsFilters} =
    useTransactionsFilters();

  const dispatch = useDispatch();
  const {dateViewFilterTimestamp, viewMode}: DashboardState = useSelector(
    (state: RootState) => state.dashboard
  );

  const dateViewFilter = useMemo(
    () =>
      dateViewFilterTimestamp ? new Date(dateViewFilterTimestamp) : undefined,
    [dateViewFilterTimestamp]
  );

  useEffect(() => {
    if (!dateViewFilter) {
      dispatch(setDateViewFilter(currentDate.toISOString()));
    }
  }, []);

  useEffect(() => {
    setTransactionsFilters({
      ...transactionsFilters,
      paymentMethod: [
        viewMode === "account"
          ? $Enums.PaymentMethodEnum.ACCOUNT
          : $Enums.PaymentMethodEnum.CREDIT_CARD,
      ],
    });
  }, [viewMode]);

  const handleViewModeChange = (viewMode: DashboardViewMode): void => {
    dispatch(setViewMode(viewMode));
  };

  const handleDateViewFilterChange = (date: Date): void => {
    dispatch(setDateViewFilter(date.toISOString()));
    setTransactionsFilters({
      ...transactionsFilters,
      endDate: endOfMonth(date).toISOString(),
      startDate: startOfMonth(date).toISOString(),
    });
  };

  return {
    dateViewFilter,
    setDateViewFilter: handleDateViewFilterChange,
    setViewMode: handleViewModeChange,
    viewMode,
  };
};
