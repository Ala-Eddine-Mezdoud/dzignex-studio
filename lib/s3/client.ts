import { S3Client } from "@aws-sdk/client-s3";

/** Bucket lives in eu-central-1 (hostx-media.s3.eu-central-1.amazonaws.com). */
export const S3_REGION = process.env.AWS_REGION || "eu-central-1";

export const s3Client = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export const BUCKET_NAME = process.env.AWS_S3_BUCKET || "hostx-media";
