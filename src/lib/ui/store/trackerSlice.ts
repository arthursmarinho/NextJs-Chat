import {TrackerCreateTransactionBodyDto} from "@/lib/shared/dtos/tracker/TrackerCreateTransaction.dto";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TrackerViewMode = "expense" | "income";

const baseTransaction: Partial<TrackerCreateTransactionBodyDto> = {};

export interface TrackerState {
  latestTags?: string[];
  transaction?: Partial<TrackerCreateTransactionBodyDto>;
  viewMode: TrackerViewMode;
}

const initialState: TrackerState = {
  transaction: baseTransaction,
  viewMode: "income",
};

const trackerSlice = createSlice({
  initialState,
  name: "tracker",
  reducers: {
    setLatestTags(state, action: PayloadAction<string[]>) {
      state.latestTags = action.payload;
    },

    setViewMode(state, action: PayloadAction<TrackerViewMode>) {
      state.viewMode = action.payload;
    },

    updateTransaction(
      state,
      action: PayloadAction<Partial<TrackerCreateTransactionBodyDto>>
    ) {
      state.transaction = {
        ...state.transaction,
        ...action.payload,
      };
    },
  },
});

export const {setLatestTags, setViewMode, updateTransaction} =
  trackerSlice.actions;

export default trackerSlice.reducer;
