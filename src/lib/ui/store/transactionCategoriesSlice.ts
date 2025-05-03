import {$Enums, TransactionCategory} from "@prisma/client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface TransactionCategoriesState {
  expenseTransactionCategories?: TransactionCategory[];
  incomingTransactionCategories?: TransactionCategory[];
  transactionCategories?: TransactionCategory[];
}

const initialState: TransactionCategoriesState = {};

const transactionCategoriesSlice = createSlice({
  initialState,
  name: "transactionCategories",
  reducers: {
    setTransactionCategories(
      state,
      action: PayloadAction<TransactionCategory[]>
    ) {
      const expenseTransactionCategories = action.payload.filter(
        (transactionCategory) =>
          transactionCategory.type === $Enums.TransactionTypeEnum.EXPENSE ||
          transactionCategory.type === $Enums.TransactionTypeEnum.TRANSFER
      );
      const incomingTransactionCategories = action.payload.filter(
        (transactionCategory) =>
          transactionCategory.type === $Enums.TransactionTypeEnum.INCOME ||
          transactionCategory.type === $Enums.TransactionTypeEnum.TRANSFER
      );

      state.expenseTransactionCategories = expenseTransactionCategories;
      state.incomingTransactionCategories = incomingTransactionCategories;
      state.transactionCategories = action.payload;
    },
  },
});

export const {setTransactionCategories} = transactionCategoriesSlice.actions;

export default transactionCategoriesSlice.reducer;
