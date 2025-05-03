import {TrackerCreateTransactionBodyDto} from "@/lib/shared/dtos/tracker/TrackerCreateTransaction.dto";
import {TransactionTypeEnum} from "@prisma/client";
import {useQuery} from "@tanstack/react-query";
import {isNil} from "lodash";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {SelectOption} from "../components/ui/select";
import TrackerApiService from "../services/TrackerApi.service";
import {RootState} from "../store/store";
import {setViewMode, TrackerViewMode} from "../store/trackerSlice";
import {
  setLatestTags,
  TrackerState,
  updateTransaction,
} from "../store/trackerSlice";

interface UseTrackerData {
  getLatestTagsOptions: () => SelectOption[];
  latestTags?: string[];
  setViewMode: (viewMode: TrackerViewMode) => void;
  transaction?: Partial<TrackerCreateTransactionBodyDto>;
  updateTransaction: (
    transaction: Partial<TrackerCreateTransactionBodyDto>
  ) => void;
  viewMode: TrackerViewMode;
}

export const useTracker = (): UseTrackerData => {
  const dispatch = useDispatch();

  const {latestTags, transaction, viewMode}: TrackerState = useSelector(
    (state: RootState) => state.tracker
  );

  const getLatestTagsQuery = useQuery({
    queryFn: () =>
      TrackerApiService.getLatestTags({
        type:
          viewMode === "income"
            ? TransactionTypeEnum.INCOME
            : TransactionTypeEnum.EXPENSE,
      }),
    queryKey: ["getLatestTags", viewMode],
  });

  useEffect(() => {
    const {data} = getLatestTagsQuery;
    if (isNil(data)) return;

    dispatch(setLatestTags(data));
  }, [getLatestTagsQuery.data]);

  const getLatestTagsOptions = (): SelectOption[] => {
    if (!latestTags) return [];

    return latestTags.map((tag) => ({
      label: tag,
      value: tag,
    }));
  };

  const handleTransactionUpdate = (
    transaction: Partial<TrackerCreateTransactionBodyDto>
  ): void => {
    dispatch(updateTransaction(transaction));
  };

  return {
    getLatestTagsOptions,
    latestTags,
    setViewMode: (viewMode: TrackerViewMode) => dispatch(setViewMode(viewMode)),
    transaction,
    updateTransaction: handleTransactionUpdate,
    viewMode,
  };
};
