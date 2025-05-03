import {Account} from "@prisma/client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isEqual} from "lodash";

export interface AccountsState {
  accounts?: Account[];
}

const initialState: AccountsState = {};

const accountsSlice = createSlice({
  initialState,
  name: "accounts",
  reducers: {
    setAccounts(state, action: PayloadAction<Account[]>) {
      if (isEqual(state.accounts, action.payload)) return;

      state.accounts = action.payload;
    },
  },
});

export const {setAccounts} = accountsSlice.actions;

export default accountsSlice.reducer;
