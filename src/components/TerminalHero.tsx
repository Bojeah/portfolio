"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Terminal } from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

type LogEntry = {
  id: number;
  command: string;
  output: string[];
};

const QUICK_COMMANDS = ["help", "whoami", "ls projects", "stack", "contact"];

export default function TerminalHero() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    {
      id: 1,
      command: "cat ./status.json",
      output: [
        `{`,
        `  "user": "${site.name}",`,
        `  "role": "Full-Stack Software Engineer",`,
        `  "location": "${site.location}",`,
        `  "availability": "OPEN_FOR_ROLES_AND_FREELANCE"`,
        `}`,
      ],
    },
  ]);

  function runCommand(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    const lower = cmd.toLowerCase();

    if (lower === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let output: string[] = [];

    if (lower === "help") {
      output = [
        "Available commands:",
        "  whoami          - developer profile and focus",
        "  ls projects     - list deployed & featured builds",
        "  open <slug>     - launch project (e.g. open canvas-for-a-cause)",
        "  stack           - inspect core technologies",
        "  contact         - copy email address to clipboard",
        "  clear           - clear terminal buffer",
      ];
    } else if (lower === "whoami") {
      output = [
        `${site.name} // Final-year CS @ Pan-Atlantic University.`,
        "Builds reliable payment flows, multi-tenant auth, and real-time systems.",
      ];
    } else if (
      lower === "ls" ||
      lower === "ls projects" ||
      lower === "projects"
    ) {
      output = projects.map(
        (p, i) =>
          `0${i + 1}  ${p.slug.padEnd(24, " ")} [${p.caseStudy ? "CASE_STUDY" : "SOURCE"}]`,
      );
    } else if (lower === "stack") {
      output = [
        "FRONTEND : React 19, Next.js, TypeScript, Tailwind CSS",
        "BACKEND  : NestJS, FastAPI (Python), ASP.NET Core (C#)",
        "DATA     : PostgreSQL, Prisma, SQLAlchemy, Supabase",
        "REALTIME : SignalR, WebSockets, ONNX Runtime",
      ];
    } else if (lower === "contact") {
      navigator.clipboard?.writeText(site.email);
      output = [
        `Copied ${site.email} to clipboard. Or run: mailto:${site.email}`,
      ];
    } else if (lower.startsWith("open ")) {
      const target = lower.replace("open ", "").trim();
      const match = projects.find(
        (p) => p.slug === target || p.name.toLowerCase().includes(target),
      );
      if (match && match.caseStudy) {
        output = [`Routing to /projects/${match.slug}...`];
        setTimeout(() => router.push(`/projects/${match.slug}`), 320);
      } else if (match) {
        output = [`Opening GitHub repo for ${match.name}...`];
        window.open(match.repoUrl, "_blank", "noopener,noreferrer");
      } else {
        output = [`Error: project "${target}" not found. Try "ls projects".`];
      }
    } else {
      output = [
        `sh: command not found: ${cmd}. Type "help" for valid commands.`,
      ];
    }

    setHistory((prev) => [
      ...prev.slice(-4),
      { id: Date.now(), command: cmd, output },
    ]);
    setInput("");
  }

  return (
    <motion.div
      className="cli-window"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="cli-window__bar">
        <div className="cli-window__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="cli-window__title">
          <Terminal size={13} aria-hidden="true" /> benedict@lagos:~/portfolio —
          zsh
        </span>
        <span className="cli-window__badge">INTERACTIVE</span>
      </div>

      <div className="cli-window__body" role="log" aria-live="polite">
        {history.map((entry) => (
          <div key={entry.id} className="cli-entry">
            <p className="cli-prompt-line">
              <span className="cli-user">guest@bojeah</span>
              <span className="cli-sep">:</span>
              <span className="cli-path">~</span>
              <span className="cli-dollar">$</span> {entry.command}
            </p>
            <pre className="cli-output">{entry.output.join("\n")}</pre>
          </div>
        ))}

        <form
          className="cli-form"
          onSubmit={(e) => {
            e.preventDefault();
            runCommand(input);
          }}
        >
          <label htmlFor="cli-input" className="visually-hidden">
            Terminal command input
          </label>
          <span className="cli-prompt-line">
            <span className="cli-user">guest@bojeah</span>
            <span className="cli-sep">:</span>
            <span className="cli-path">~</span>
            <span className="cli-dollar">$</span>
          </span>
          <input
            ref={inputRef}
            id="cli-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help' and hit enter..."
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>

      <div className="cli-chips" aria-label="Quick terminal commands">
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            className="cli-chip"
            onClick={(e) => {
              e.stopPropagation();
              runCommand(cmd);
            }}
          >
            $ {cmd}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
