import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, BUCKET_NAME } from "./client";

/**
 * Extracts the S3 key from a full S3/CDN URL.
 * e.g. "https://hostx-media.s3.eu-central-1.amazonaws.com/blog/covers/file.webp"
 *   → "blog/covers/file.webp"
 */
export function extractS3Key(url: string): string | null {
  try {
    const parsed = new URL(url);
    // Remove the leading slash from the pathname
    return parsed.pathname.replace(/^\//, "");
  } catch {
    return null;
  }
}

/**
 * Deletes a single file from S3 by its full URL.
 * Silently ignores failures so they never block the main operation.
 */
export async function deleteS3File(url: string): Promise<void> {
  const key = extractS3Key(url);
  if (!key) return;

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })
    );
    console.log(`[S3] Deleted: ${key}`);
  } catch (err) {
    console.error(`[S3] Failed to delete ${key}:`, err);
  }
}

/**
 * Extracts all image src URLs from HTML content (for in-editor images).
 * Only returns URLs that point to our S3 bucket.
 */
export function extractS3ImagesFromHtml(html: string): string[] {
  const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const src = match[1];
    if (src.includes(BUCKET_NAME) || src.includes("amazonaws.com")) {
      matches.push(src);
    }
  }
  return matches;
}