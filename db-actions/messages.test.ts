// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const messageMocks = vi.hoisted(() => {
  const findMany = vi.fn();
  const findFirst = vi.fn();
  const updateWhere = vi.fn();
  const updateSet = vi.fn(() => ({ where: updateWhere }));
  const update = vi.fn(() => ({ set: updateSet }));
  const deleteWhere = vi.fn();
  const deleteFn = vi.fn(() => ({ where: deleteWhere }));
  const selectWhere = vi.fn();
  const selectFrom = vi.fn(() => ({ where: selectWhere }));
  const select = vi.fn(() => ({ from: selectFrom }));

  return {
    findMany,
    findFirst,
    update,
    updateSet,
    updateWhere,
    deleteFn,
    deleteWhere,
    select,
    selectFrom,
    selectWhere,
    requireAuth: vi.fn(),
  };
});

vi.mock("../db/drizzle", () => ({
  db: {
    query: {
      messages: {
        findMany: messageMocks.findMany,
        findFirst: messageMocks.findFirst,
      },
    },
    update: messageMocks.update,
    delete: messageMocks.deleteFn,
    select: messageMocks.select,
  },
}));

vi.mock("../lib/auth-guard", () => ({
  requireAuth: messageMocks.requireAuth,
}));

import {
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
  getMessagesCount,
  updateMessageLabel,
} from "./messages";

describe("db-actions/messages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    messageMocks.requireAuth.mockResolvedValue({ user: { id: "u1" } });
  });

  it("gets all messages", async () => {
    const rows = [{ id: "m1" }, { id: "m2" }];
    messageMocks.findMany.mockResolvedValue(rows);

    const result = await getMessages();

    expect(messageMocks.requireAuth).toHaveBeenCalledTimes(1);
    expect(messageMocks.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual(rows);
  });

  it("gets one message by id", async () => {
    const row = { id: "m1" };
    messageMocks.findFirst.mockResolvedValue(row);

    const result = await getMessageById("m1");

    expect(messageMocks.requireAuth).toHaveBeenCalledTimes(1);
    expect(messageMocks.findFirst).toHaveBeenCalledTimes(1);
    expect(result).toEqual(row);
  });

  it("updates message status", async () => {
    messageMocks.updateWhere.mockResolvedValue(undefined);

    const result = await updateMessageStatus("m1", "READ");

    expect(messageMocks.requireAuth).toHaveBeenCalledTimes(1);
    expect(messageMocks.update).toHaveBeenCalledTimes(1);
    expect(messageMocks.updateSet).toHaveBeenCalledWith({ status: "READ" });
    expect(messageMocks.updateWhere).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: true });
  });

  it("deletes a message", async () => {
    messageMocks.deleteWhere.mockResolvedValue(undefined);

    const result = await deleteMessage("m1");

    expect(messageMocks.requireAuth).toHaveBeenCalledTimes(1);
    expect(messageMocks.deleteFn).toHaveBeenCalledTimes(1);
    expect(messageMocks.deleteWhere).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: true });
  });

  it("returns numeric message count", async () => {
    messageMocks.selectWhere.mockResolvedValue([{ count: "3" }]);

    const result = await getMessagesCount("UNREAD");

    expect(messageMocks.requireAuth).toHaveBeenCalledTimes(1);
    expect(messageMocks.select).toHaveBeenCalledTimes(1);
    expect(messageMocks.selectFrom).toHaveBeenCalledTimes(1);
    expect(messageMocks.selectWhere).toHaveBeenCalledTimes(1);
    expect(result).toBe(3);
  });

  it("updates message label", async () => {
    messageMocks.updateWhere.mockResolvedValue(undefined);

    const result = await updateMessageLabel("m1", "important");

    expect(messageMocks.requireAuth).toHaveBeenCalledTimes(1);
    expect(messageMocks.updateSet).toHaveBeenCalledWith({ label: "important" });
    expect(result).toEqual({ success: true });
  });
});
