// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const dbMocks = vi.hoisted(() => ({
  findToken: vi.fn(),
  findUser: vi.fn(),
}));

vi.mock("../../../../db/drizzle", () => ({
  db: {
    query: {
      verificationTokens: {
        findFirst: dbMocks.findToken,
      },
      users: {
        findFirst: dbMocks.findUser,
      },
    },
  },
}));

import { GET } from "./route";

describe("GET /api/auth/magic-link", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when token or email is missing", async () => {
    const request = {
      nextUrl: new URL("https://dzignex.studio/api/auth/magic-link"),
      url: "https://dzignex.studio/api/auth/magic-link",
    } as any;

    const res = await GET(request);

    expect(res.status).toBe(400);
    await expect(res.text()).resolves.toBe("Invalid magic link");
  });

  it("redirects to sign-in on invalid token", async () => {
    dbMocks.findToken.mockResolvedValue(null);

    const request = {
      nextUrl: new URL("https://dzignex.studio/api/auth/magic-link?token=abc&email=hello@dzignex.studio"),
      url: "https://dzignex.studio/api/auth/magic-link?token=abc&email=hello@dzignex.studio",
    } as any;

    const res = await GET(request);

    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(
      "https://dzignex.studio/sign-in?error=InvalidMagicLink"
    );
  });

  it("redirects to sign-in when user does not exist", async () => {
    dbMocks.findToken.mockResolvedValue({ token: "abc" });
    dbMocks.findUser.mockResolvedValue(null);

    const request = {
      nextUrl: new URL("https://dzignex.studio/api/auth/magic-link?token=abc&email=hello@dzignex.studio"),
      url: "https://dzignex.studio/api/auth/magic-link?token=abc&email=hello@dzignex.studio",
    } as any;

    const res = await GET(request);

    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(
      "https://dzignex.studio/sign-in?error=UserNotFound"
    );
  });

  it("redirects to callback when token and user are valid", async () => {
    dbMocks.findToken.mockResolvedValue({ token: "abc" });
    dbMocks.findUser.mockResolvedValue({ id: "u1", email: "hello+test@dzignex.studio" });

    const request = {
      nextUrl: new URL("https://dzignex.studio/api/auth/magic-link?token=abc&email=hello%2Btest%40dzignex.studio"),
      url: "https://dzignex.studio/api/auth/magic-link?token=abc&email=hello%2Btest%40dzignex.studio",
    } as any;

    const res = await GET(request);

    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe(
      "https://dzignex.studio/magic-link-callback?token=abc&email=hello%2Btest%40dzignex.studio"
    );
  });
});
