"use server"

import { db } from "../db/drizzle";
import { messages } from "../db/schema/messages";
import { eq, desc, sql } from "drizzle-orm";

/**
 * Get all messages ordered by creation date (newest first)
 */
export async function getMessages() {
  try {
    return await db.query.messages.findMany({
      orderBy: [desc(messages.createdAt)],
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch messages");
  }
}

/**
 * Get a single message by ID
 */
export async function getMessageById(id: string) {
  try {
    const message = await db.query.messages.findFirst({
      where: eq(messages.id, id),
    });
    return message;
  } catch (error) {
    console.error(`Error fetching message with id ${id}:`, error);
    throw new Error("Failed to fetch message");
  }
}

/**
 * Update message status (e.g., mark as READ or REPLIED)
 */
export async function updateMessageStatus(id: string, status: "UNREAD" | "READ" | "REPLIED") {
  try {
    await db.update(messages)
      .set({ status })
      .where(eq(messages.id, id));
    return { success: true };
  } catch (error) {
    console.error(`Error updating status for message ${id}:`, error);
    throw new Error("Failed to update message status");
  }
}

/**
 * Delete a message by ID
 */
export async function deleteMessage(id: string) {
  try {
    await db.delete(messages)
      .where(eq(messages.id, id));
    return { success: true };
  } catch (error) {
    console.error(`Error deleting message ${id}:`, error);
    throw new Error("Failed to delete message");
  }
}

/**
 * Get total messages count or count by status
 */
export async function getMessagesCount(status?: "UNREAD" | "READ" | "REPLIED") {
  try {
    const whereClause = status ? eq(messages.status, status) : undefined;
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages)
      .where(whereClause);
    
    return Number(result[0]?.count || 0);
  } catch (error) {
    console.error("Error counting messages:", error);
    throw new Error("Failed to get messages count");
  }
}
