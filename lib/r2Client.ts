import { S3Client } from "@aws-sdk/client-s3";

export const R2_REGION = "auto";

export const r2Client = new S3Client({
  region: R2_REGION,
  endpoint: process.env.R2_ENDPOINT || "",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true,
});

export const BUCKET_NAME = process.env.R2_BUCKET || "dzignex-assets";