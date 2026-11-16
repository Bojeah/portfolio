"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Copy,
  FolderGit2,
  Home,
  Mail,
  Search,
  Terminal,
  User,
  Wrench,
  X,
} from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

type CommandItem = {
  id: string;
  label: string;
  hint: string;
  group: "NAVIGATION" | "CASE STUDIES" | "ACTIONS";
  icon: React.ReactNode;
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: "home",
        label: "cd ~/",
        hint: "Home",
        group: "NAVIGATION",
        icon: <Home size={15} />,
        action: () => router.push("/"),
      },
      {
        id: "about",
        label: "cat ./about.md",
        hint: "About",
        group: "NAVIGATION",
        icon: <User size={15} />,
        action: () => router.push("/#about"),
      },
      {
        id: "work",
        label: "ls -la ./projects",
        hint: "Selected Work",
        group: "NAVIGATION",
        icon: <FolderGit2 size={15} />,
        action: () => router.push("/#work"),
      },
      {
        id: "stack",
        label: "env --list-stack",
        hint: "Tech Stack",
        group: "NAVIGATION",
        icon: <Wrench size={15} />,
        action: () => router.push("/#stack"),
      },
      ...projects
        .filter((p) => p.caseStudy)
        .map((project) => ({
          id: `study-${project.slug}`,
          label: `open ./projects/${project.slug}`,
          hint: project.name,
          group: "CASE STUDIES" as const,
          icon: <Terminal size={15} />,
          action: () => router.push(`/projects/${project.slug}`),
        })),
      {
        id: "copy-email",
        label: `pbcopy "${site.email}"`,
        hint: copied ? "Copied!" : "Copy Email",
        group: "ACTIONS",
        icon: copied ? <Check size={15} /> : <Copy size={15} />,
        action: () => {
          navigator.clipboard?.writeText(site.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
      },
      {
        id: "mailto",
        label: "mail -s 'Hello Benedict'",
        hint: "Open Mail Client",
        group: "ACTIONS",
        icon: <Mail size={15} />,
        action: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "github",
        label: "open https://github.com/Bojeah",
        hint: "GitHub Profile",
        group: "ACTIONS",
        icon: <ArrowUpRight size={15} />,
        action: () => window.open(site.github, "_blank", "noopener,noreferrer"),
      },
    ],
    [copied, router],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }

    function onOpenEvent() {
      setOpen(true);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenEvent);
    };
  }, []);

  function handleKeyNavigation(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filtered.length ? (prev + 1) % filtered.length : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="cmd-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyNavigation}
          >
            <div className="cmd-search">
              <Search size={16} aria-hidden="true" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search projects..."
                aria-label="Search commands"
              />
              <button
                type="button"
                className="cmd-close"
                onClick={() => setOpen(false)}
                aria-label="Close command palette"
              >
                <X size={15} />
              </button>
            </div>

            <div className="cmd-list" role="listbox">
              {filtered.length === 0 ? (
                <p className="cmd-empty">zsh: command not found: {query}</p>
              ) : (
                filtered.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={idx === selectedIndex}
                    className={`cmd-item ${idx === selectedIndex ? "is-active" : ""}`}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => {
                      item.action();
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    <span className="cmd-item__left">
                      {item.icon}
                      <code>{item.label}</code>
                    </span>
                    <span className="cmd-item__right">
                      <span className="cmd-item__hint">{item.hint}</span>
                      <span className="cmd-item__group">{item.group}</span>
                    </span>
                  </button>
                ))
              )}
            </div>

            <div className="cmd-foot">
              <span>[↑↓] navigate</span>
              <span>[enter] execute</span>
              <span>[esc] close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
