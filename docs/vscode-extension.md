# Using Claude Code in VS Code

A step-by-step guide to using the **Claude Code VS Code extension** while working on
this course project (**devlens**). It's tuned for the course setup: you have an
Anthropic API key from your instructor and the `devlens` repo open in VS Code.

> **Heads up:** the Claude Code *extension* is the real assistant that helps you build
> and understand this repo. **devlens** (the app you run with `node index.js`) is a tiny
> clone you're studying. They are two different things — don't confuse them.

---

## 1. Install the extension

1. Open VS Code in the project from a terminal:

   ```bash
   cd claude-code-course-2026
   code .
   ```

   **Why launch from the terminal?** VS Code inherits your shell's environment, so if
   you've already `export ANTHROPIC_API_KEY=...`, the extension picks it up automatically.
2. Open the Extensions panel: `Ctrl+Shift+X` (Mac: `Cmd+Shift+X`).
3. Search **"Claude Code"** (publisher: Anthropic) and click **Install**.
4. If nothing appears afterward, run **Developer: Reload Window** from the Command
   Palette (`Ctrl+Shift+P`).

**Requirements:** VS Code 1.98.0 or newer. The extension bundles its own runtime, so you
don't need a separate CLI install just to use the panel.

---

## 2. Open the Claude panel

Any of these work:

- Click the **Spark icon** in the top-right of the editor toolbar (appears when a file is open).
- Click the **Spark icon** in the left Activity Bar.
- Command Palette (`Ctrl+Shift+P`) → type **"Claude Code"**.

You can drag the panel to the right sidebar (default), left sidebar, or open it as a full
editor tab. It remembers your choice.

---

## 3. Authenticate

Two paths — pick one:

- **API key (what your instructor gave you):** make sure `ANTHROPIC_API_KEY` is set in
  your shell, then launch VS Code with `code .`. The extension uses it automatically.
- **Subscription login:** click **Sign in** in the panel and complete the browser flow.
  Use this if you have a Claude.ai plan instead of the key.

> Your course key has a usage budget — keep it to the devlens work.

---

## 4. The core workflow

1. **Type a prompt** in the panel and press `Enter` (`Shift+Enter` for a newline).
2. **Reference files with `@`** — e.g. `@api.js`, `@tools.js`, or `@public/`
   (trailing slash for a folder). Fuzzy matching works.
3. **Use your selection as context** — highlight code in the editor, then press `Alt+K`
   to drop an `@`-mention with line numbers (like `@api.js#29-64`) into the prompt.
   Claude also sees your current selection automatically.
4. **Review edits as diffs** — when Claude proposes a change, it opens a **side-by-side
   diff** in VS Code. You can **Accept**, **Reject**, or edit the diff before accepting.
5. **Share errors** — if VS Code's Problems panel has language-server errors, Claude can
   read them through the built-in IDE integration (handy when devlens won't run).

---

## 5. Permission modes

Click the mode indicator at the bottom of the prompt box:

| Mode            | Behavior                                                        |
| --------------- | -------------------------------------------------------------- |
| **Default**     | Asks before each action. Good while learning.                  |
| **Plan**        | Claude describes its plan first and makes no changes until you approve. |
| **Auto-Accept** | Applies edits without asking.                                  |

For coursework, stay on **Default** or **Plan** so you see every change before it touches
your files.

---

## 6. Handy keyboard shortcuts

| Shortcut           | Action                                                  |
| ------------------ | ------------------------------------------------------- |
| `Ctrl+Esc`         | Toggle focus between editor and Claude                  |
| `Ctrl+Shift+Esc`   | New conversation in an editor tab                       |
| `Alt+K`            | Insert `@`-mention of current selection with line numbers |
| `Shift+Enter`      | Newline without sending                                 |
| `Ctrl+O`           | Expand/collapse Claude's extended-thinking blocks       |
| `` Ctrl+` ``       | Open the integrated terminal                            |

(On Mac, use `Cmd` in place of `Ctrl` for most of these.)

---

## 7. Terminal vs. the panel

You can also open VS Code's integrated terminal (`` Ctrl+` ``) and run `claude` — that
gives you the full CLI (tab completion, the `!` bash shortcut, all slash commands) while
still getting VS Code's native diff viewer, because the CLI auto-connects to the editor.

- **Panel** — friendlier, graphical, great for quick edits.
- **Terminal CLI** — more complete.

Many people use both: the panel for quick edits, the terminal for heavier sessions.

---

## 8. Applying this to the course

Each week's assignment maps onto the extension:

- **Week 1 (`api.js` + `CLAUDE.md`):** open `api.js`, select the agent loop
  (`@api.js#29-64`), and ask *"walk me through the messages array here."* Then fill in
  `CLAUDE.md` by hand and ask the same questions again to see how the answers change.
- **Week 2 (`tools.js`):** `@tools.js` and ask Claude to trace a tool call end-to-end.
- **Week 3 (prompting):** test before/after prompts and compare the responses.

> Remember: write `CLAUDE.md` yourself. It's the one file in this repo that has to come
> from you.

---

## 9. Troubleshooting

| Problem                         | Fix                                                                    |
| ------------------------------- | --------------------------------------------------------------------- |
| Extension won't install         | Ensure VS Code 1.98.0+; try the VS Code Marketplace page directly.    |
| Spark icon not visible          | Open a file; check the VS Code version; run **Developer: Reload Window**. |
| API key not recognized          | Launch VS Code from the terminal (`code .`) so it inherits `ANTHROPIC_API_KEY`. |
| Claude never responds           | Check your internet; start a new conversation; try the CLI for error details. |

---

**Full official docs:** https://code.claude.com/docs/en/vs-code
