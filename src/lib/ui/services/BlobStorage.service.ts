import {head, HeadBlobResult} from "@vercel/blob";

export class BlobStorageService {
  static async getMetadata(path: string): Promise<HeadBlobResult | null> {
    try {
      return await head(path, {
        token: process.env.BLOB_READ_WRITE_TOKEN!,
      });
    } catch (error) {
      console.error("Error fetching blob metadata:", error);
    }

    return null;
  }

  static async getUrl(path: string): Promise<null | string> {
    return (await BlobStorageService.getMetadata(path))?.downloadUrl || null;
  }
}
