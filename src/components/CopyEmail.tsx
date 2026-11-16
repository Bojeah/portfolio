"use client";

import { useState } from "react";

// Copies the email address so it can be pasted anywhere.
// The mailto button next to it still works if copying is blocked.
export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <>
      <button type="button" className="btn btn--line" onClick={copy}>
        Copy address
      </button>
      <span className="copy-status" role="status" aria-live="polite">
        {status === "copied" && "Copied to clipboard"}
        {status === "failed" && "Copy failed. Select the address above instead."}
      </span>
    </>
  );
}
