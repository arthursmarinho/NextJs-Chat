import {useCallback} from "react";

import {BlobStorageService} from "../services/BlobStorage.service";

interface UseBlobStorageData {
  getMetadata: typeof BlobStorageService.getMetadata;
}

export const useBlobStorage = (): UseBlobStorageData => {
  const getMetadata = useCallback(BlobStorageService.getMetadata, []);

  return {getMetadata};
};
