"use client";

import Link from "next/link";
import { Command, Terminal } from "lucide-react";
import { site } from "@/data/site";

export default function SiteHeader() {
  function openPalette() {
    window.dispatchEvent(new Event("open-command-palette"));
  }

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="brand">
          <Terminal size={18} aria-hidden="true" />
          <span>BEN.DEV</span>
        </Link>

        <nav aria-label="Main" className="site-nav">
          <ul>
            <li>
              <Link href="/#about">
                <span>01.</span> About
              </Link>
            </li>
            <li>
              <Link href="/#work">
                <span>02.</span> Work
              </Link>
            </li>
            <li>
              <Link href="/#stack">
                <span>03.</span> Stack
              </Link>
            </li>
            <li>
              <Link href="/#contact">
                <span>04.</span> Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="cmd-trigger"
            onClick={openPalette}
            aria-label="Open command palette"
          >
            <Command size={14} aria-hidden="true" />
            <span>Ctrl+K</span>
          </button>
          <a className="btn btn--solid btn--sm" href={`mailto:${site.email}`}>
            Hire / Contact
          </a>
        </div>
      </div>
    </header>
  );
}
