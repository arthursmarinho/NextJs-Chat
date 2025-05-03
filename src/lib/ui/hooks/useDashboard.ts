"use client";

import {DashboardAccountsBalanceDto} from "@/lib/shared/dtos/dashboard/DashboardGetAccountsBalance.dto";
import {DashboardBalanceOverviewDto} from "@/lib/shared/dtos/dashboard/DashboardGetBalanceOverview.dto";
import {DashboardCreditCarsBillDto} from "@/lib/shared/dtos/dashboard/DashboardGetCreditCardsBill.dto";
import {useQuery} from "@tanstack/react-query";
import {isNil} from "lodash";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import DashboardApiService from "../services/DashboardApi.service";
import {
  DashboardState,
  DashboardViewMode,
  setAccountsBalance,
  setBalanceOverview,
  setCreditCardsBill,
  setViewMode,
} from "../store/dashboardSlice";
import {RootState} from "../store/store";
import {useDashboardFilters} from "./useDashboardFilters";

interface UseDashboardData {
  accountsBalance?: DashboardAccountsBalanceDto;
  balanceOverview?: DashboardBalanceOverviewDto;
  creditCardsBill?: DashboardCreditCarsBillDto;
  setViewMode: (viewMode: DashboardViewMode) => void;
  viewMode: DashboardViewMode;
}

export const useDashboard = (): UseDashboardData => {
  const dispatch = useDispatch();

  const {dateViewFilter} = useDashboardFilters();

  const {
    accountsBalance,
    balanceOverview,
    creditCardsBill,
    dateViewFilterTimestamp,
    viewMode,
  }: DashboardState = useSelector((state: RootState) => state.dashboard);

  const getBalanceOverviewQuery = useQuery({
    enabled: Boolean(!balanceOverview && dateViewFilter),
    queryFn: () =>
      DashboardApiService.getBalanceOverview({
        date: (dateViewFilter || new Date()).toISOString(),
      }),
    queryKey: ["getBalanceOverview", dateViewFilterTimestamp],
  });

  const getAccountsBalanceQuery = useQuery({
    enabled: Boolean(!accountsBalance && dateViewFilter),
    queryFn: () =>
      DashboardApiService.getAccountsBalance({
        date: (dateViewFilter || new Date()).toISOString(),
      }),
    queryKey: ["getAccountsBalance", dateViewFilterTimestamp],
  });

  const getCreditCardsBillQuery = useQuery({
    enabled: Boolean(!creditCardsBill && dateViewFilter),
    queryFn: () =>
      DashboardApiService.getCreditCardsBill({
        date: (dateViewFilter || new Date()).toISOString(),
      }),
    queryKey: ["getCreditCardsBill", dateViewFilterTimestamp],
  });

  useEffect(() => {
    if (
      getBalanceOverviewQuery.isLoading ||
      getBalanceOverviewQuery.error ||
      isNil(getBalanceOverviewQuery.data)
    ) {
      return;
    }

    dispatch(setBalanceOverview(getBalanceOverviewQuery.data));
  }, [getBalanceOverviewQuery.data]);

  useEffect(() => {
    if (
      getAccountsBalanceQuery.isLoading ||
      getAccountsBalanceQuery.error ||
      isNil(getAccountsBalanceQuery.data)
    ) {
      return;
    }

    dispatch(setAccountsBalance(getAccountsBalanceQuery.data));
  }, [getAccountsBalanceQuery.data]);

  useEffect(() => {
    if (
      getCreditCardsBillQuery.isLoading ||
      getCreditCardsBillQuery.error ||
      isNil(getCreditCardsBillQuery.data)
    ) {
      return;
    }

    dispatch(setCreditCardsBill(getCreditCardsBillQuery.data));
  }, [getCreditCardsBillQuery.data]);

  useEffect(() => {
    if (balanceOverview) {
      getBalanceOverviewQuery.refetch();
    }
    if (accountsBalance) {
      getAccountsBalanceQuery.refetch();
    }

    if (creditCardsBill) {
      getCreditCardsBillQuery.refetch();
    }
  }, [dateViewFilter]);

  return {
    accountsBalance,
    balanceOverview,
    creditCardsBill,
    setViewMode: (viewMode: DashboardViewMode) =>
      dispatch(setViewMode(viewMode)),
    viewMode,
  };
};
