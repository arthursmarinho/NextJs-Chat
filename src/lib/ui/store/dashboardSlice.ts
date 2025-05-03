import {DashboardAccountsBalanceDto} from "@/lib/shared/dtos/dashboard/DashboardGetAccountsBalance.dto";
import {DashboardBalanceOverviewDto} from "@/lib/shared/dtos/dashboard/DashboardGetBalanceOverview.dto";
import {DashboardCreditCarsBillDto} from "@/lib/shared/dtos/dashboard/DashboardGetCreditCardsBill.dto";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type DashboardViewMode = "account" | "creditCard";

export interface DashboardState {
  accountsBalance?: DashboardAccountsBalanceDto;
  balanceOverview?: DashboardBalanceOverviewDto;
  creditCardsBill?: DashboardCreditCarsBillDto;
  dateViewFilterTimestamp?: string;
  viewMode: DashboardViewMode;
}

const initialState: DashboardState = {
  viewMode: "account",
};

const dashboardSlice = createSlice({
  initialState,
  name: "dashboard",
  reducers: {
    setAccountsBalance(
      state,
      action: PayloadAction<DashboardAccountsBalanceDto>
    ) {
      state.accountsBalance = action.payload;
    },
    setBalanceOverview(
      state,
      action: PayloadAction<DashboardBalanceOverviewDto>
    ) {
      state.balanceOverview = action.payload;
    },
    setCreditCardsBill(
      state,
      action: PayloadAction<DashboardCreditCarsBillDto>
    ) {
      state.creditCardsBill = action.payload;
    },
    setDateViewFilter(state, action: PayloadAction<string>) {
      state.dateViewFilterTimestamp = action.payload;
    },
    setViewMode(state, action: PayloadAction<DashboardViewMode>) {
      state.viewMode = action.payload;
    },
  },
});

export const {
  setAccountsBalance,
  setBalanceOverview,
  setCreditCardsBill,
  setDateViewFilter,
  setViewMode,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
