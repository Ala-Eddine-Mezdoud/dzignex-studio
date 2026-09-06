"use client";

import dynamic from "next/dynamic";

/**
 * Client-side wrapper so the chat widget can be code-split out of the first
 * load. It ships react-markdown + remark-gfm and starts closed, so none of
 * that belongs in the initial bundle — and `ssr: false` is only legal from a
 * client component, which is the whole reason this file exists.
 */
const SupportChat = dynamic(() => import("./SupportChat"), { ssr: false });

export default function SupportChatLazy() {
  return <SupportChat />;
}
