"use server"

import { db } from "../db/drizzle"
import { projects } from "../db/schema/projects"
import { users } from "../db/schema/user"
import { messages } from "../db/schema/messages"
import { eq, sql } from "drizzle-orm"
import { ListObjectsV2Command, ListObjectsV2Output } from "@aws-sdk/client-s3"
import { r2Client, BUCKET_NAME } from "../lib/r2Client"

export interface DashboardKPIs {
  totalProjects: number
  publishedProjects: number
  teamMembers: number
  unreadMessages: number
  totalMessages: number
  storageUsed: string
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

/**
 * Get total storage used from R2 bucket (same as media library)
 */
async function getTotalStorageUsed(): Promise<number> {
  try {
    let totalSize = 0
    let continuationToken: string | undefined = undefined

    do {
      const response: ListObjectsV2Output = await r2Client.send(
        new ListObjectsV2Command({
          Bucket: BUCKET_NAME,
          ContinuationToken: continuationToken,
        })
      )

      for (const item of response.Contents ?? []) {
        totalSize += item.Size ?? 0
      }

      continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined
    } while (continuationToken)

    return totalSize
  } catch (error) {
    console.error("Error getting storage usage:", error)
    return 0
  }
}

/**
 * Get dashboard KPIs
 */
export async function getDashboardKPIs(): Promise<DashboardKPIs> {
  try {
    // Get total projects
    const [projectsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(projects)

    // Get published projects
    const [publishedProjectsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(projects)
      .where(eq(projects.isPublished, true))

    // Get team members (non-banned users)
    const [teamMembersResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.banned, false))

    // Get unread messages
    const [unreadMessagesResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages)
      .where(eq(messages.status, "UNREAD"))

    // Get total messages
    const [totalMessagesResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages)

    // Get total storage used from R2 bucket (same as media library)
    const totalBytes = await getTotalStorageUsed()

    return {
      totalProjects: projectsResult?.count || 0,
      publishedProjects: publishedProjectsResult?.count || 0,
      teamMembers: teamMembersResult?.count || 0,
      unreadMessages: unreadMessagesResult?.count || 0,
      totalMessages: totalMessagesResult?.count || 0,
      storageUsed: formatBytes(totalBytes),
    }
  } catch (error) {
    console.error("Error fetching dashboard KPIs:", error)
    return {
      totalProjects: 0,
      publishedProjects: 0,
      teamMembers: 0,
      unreadMessages: 0,
      totalMessages: 0,
      storageUsed: "0 B",
    }
  }
}
