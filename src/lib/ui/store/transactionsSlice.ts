import {GetTransactionsParamsDto} from "@/lib/shared/dtos/transactions/GetTransactionsParams.dto";
import {Transaction} from "@prisma/client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isEqual} from "lodash";

export interface TransactionsState {
  filters?: GetTransactionsParamsDto["filters"];
  pagination: GetTransactionsParamsDto["pagination"];
  transactions?: Transaction[];
}

const initialState: TransactionsState = {
  pagination: {
    cursor: 0,
    take: 1000,
  },
};

const transactionsSlice = createSlice({
  initialState,
  name: "transactions",
  reducers: {
    setFilters(
      state,
      action: PayloadAction<GetTransactionsParamsDto["filters"]>
    ) {
      state.filters = action.payload;
    },
    setPagination(
      state,
      action: PayloadAction<GetTransactionsParamsDto["pagination"]>
    ) {
      state.pagination = action.payload;
    },
    setTransactions(state, action: PayloadAction<Transaction[] | undefined>) {
      if (isEqual(state.transactions, action.payload)) return;

      state.transactions = action.payload;
    },
  },
});

export const {setFilters, setPagination, setTransactions} =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
