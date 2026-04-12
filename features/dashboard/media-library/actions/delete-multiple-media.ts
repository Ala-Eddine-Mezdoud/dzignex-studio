"use server"

import { deleteMedia } from "./delete-media"

export async function deleteMultipleMedia(keys: string[]) {
  const results = await Promise.allSettled(keys.map((key) => deleteMedia(key)))
  const errors = results
    .flatMap((result, index) =>
      result.status === "rejected" || (result.status === "fulfilled" && !result.value.success)
        ? [`${keys[index]}: ${result.status === "rejected" ? String(result.reason) : result.value.error}`]
        : []
    )

  if (errors.length > 0) {
    return {
      success: false,
      error: `One or more items could not be deleted: ${errors.join("; ")}`,
    }
  }

  return {
    success: true,
  }
}
