# Claude Code Course 2026

A four-session hands-on course on building with Claude. Each week you'll extend **devlens** — a small AI coding assistant that reads your project files and answers questions about your codebase.

---

## What you'll need

### Accounts
- **GitHub account** — to fork this repo and submit your work
- **Anthropic API key** — your instructor will provide one. Get it from [console.anthropic.com](https://console.anthropic.com) if you need your own.

### Software to install

**Node.js** (v18 or later)
- Download from [nodejs.org](https://nodejs.org) — install the LTS version

**Claude Code** (the CLI)
```bash
npm install -g @anthropic-ai/claude-code
```

**VS Code** (recommended editor)
- Download from [code.visualstudio.com](https://code.visualstudio.com)
- Install the **Claude Code extension** from the VS Code marketplace
- New to the extension? See [docs/vscode-extension.md](docs/vscode-extension.md) for a step-by-step guide

---

## Getting started

**1. Fork this repo**
Click "Fork" in the top right on GitHub. This gives you your own copy to push changes to.

**2. Clone your fork**
```bash
git clone https://github.com/YOUR_USERNAME/claude-code-course-2026.git
cd claude-code-course-2026
```

**3. Install dependencies**
```bash
npm install
```

**4. Add your API key**
```bash
cp .env.example .env
```
Open `.env` and replace `your-api-key-here` with the key your instructor gave you.

> **Never commit your `.env` file.** The repo already includes a `.gitignore` that blocks it, but double-check before pushing: run `git status` and make sure `.env` does not appear in the list.

**5. Run devlens**
```bash
node index.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Using Claude Code with your API key

Claude Code can run using your course API key instead of a Claude.ai subscription:

```bash
export ANTHROPIC_API_KEY=your-api-key-here
claude
```

To make this persist across terminal sessions, add the export line to your `~/.zshrc` or `~/.bashrc`, then restart your terminal.

> **Note:** Your API key has a usage budget. It covers in-class work on this project — avoid using it for unrelated projects.

---

## Week 1 assignment

This week is about understanding how Claude actually works under the hood — specifically the messages array that drives every AI conversation.

### What to submit
Push two commits to your fork:

**Commit 1 — commented api.js (without CLAUDE.md)**
- Open `api.js` in your editor
- Use Claude Code to ask questions: *"What does this file do?"*, *"Walk me through the agent loop"*, *"What is the messages array?"*
- Add comments to `api.js` in your own words explaining what you learned
- Commit: `git commit -m "feat: add api.js comments"`

**Commit 2 — CLAUDE.md + rewritten comments**
- Write `CLAUDE.md` **by hand** — your background, how you learn best, how you like Claude to talk to you
- Ask Claude the same questions again — notice how the answers change
- Rewrite your comments based on the better explanations
- Commit: `git commit -m "feat: add CLAUDE.md and rewrite comments"`

The diff between your two commits *is* the assignment — it shows what personalizing Claude's context actually does.

> **Why write CLAUDE.md yourself?** Claude can write it for you — but don't let it. CLAUDE.md is the one file in this repo that has to come from you. It's what makes your codebase yours. Every other file Claude touches; this one is where you tell Claude who you are. The more honest and specific you are, the more useful every future interaction becomes. Think of it as authoring your own developer identity.

### Tips for asking Claude Code about this codebase
- *"Explain api.js to me like I've never seen an API before"*
- *"What happens step by step when I send a message in the browser?"*
- *"Why does the messages array keep growing with each turn?"*
- *"What would happen if we removed the MAX_ITERATIONS cap?"*

---

## Week 2 assignment

This week is about understanding the tool use cycle — how Claude asks your code to do things, and how your code decides whether to honor those requests.

### What to submit
Push one commit to your fork:

**An existing skill that could help you and why**
- Write a short reflection on why
- Create a `reflections` folder in devlens
- Add reflection to fork as `.txt` or `.md`

**A custom skill for devlens**
- Create `.claude/skills/[your-skill-name]/SKILL.md`
- Pick one of these options (or create your own):
  - `/trace` — trace a tool call (read_file, write_file, etc.) end-to-end through the codebase
  - `/diagram` — explain the request/response flow for a specific scenario
  - `/compare` — compare how devlens implements something vs how Claude Code does it
  - `/explain-gap` — document what you learned by fixing this week's gap
- Test your skill in Claude Code to make sure it works
- Commit: `git commit -m "feat: add [skill-name] skill"`

### Standards for a good skill
Your skill should have:
1. **Specific description** — Clear enough that Claude knows when to use it
2. **Clear instructions** — Numbered steps, specific output format
3. **Examples in the instructions** — Show Claude what good output looks like
4. **Arguments where needed** — Use `$ARGUMENTS` or `$0, $1, $2` for input

### Tips for writing your skill
- Read through `tools.js` and `api.js` first to understand what you're explaining
- Use actual line numbers and file names in your skill instructions
- Test it multiple times — if Claude's output isn't what you wanted, refine the instructions
- Make it devlens-specific — it should require understanding this codebase to write it

> **Why devlens-specific?** Generic skills like `/review` can be written without reading any code. Skills like `/trace` or `/diagram` force you to understand how devlens works under the hood. The skill is evidence you understand the tool use cycle.

---

## Week 3 assignment

This week is about understanding how Claude makes decisions — and what to do when it makes the wrong one.

### What to submit
Push one commit to your fork:

**A before and after prompt trace**
- Find a prompt from your own chat history in any AI tool — something that didn't quite get you what you wanted
- Rewrite it applying what you learned today: add missing context, remove conflicting signals, be more specific
- Test **both versions** in devlens and screenshot or paste the two responses
- Create a `traces` folder in your repo and add `traces/week-3.md`
- In that file include:
  1. **Your original prompt** and Claude's response
  2. **Your rewritten prompt** and Claude's response
  3. **One sentence** explaining what you changed and why it worked
- Commit: `git commit -m "feat: add week-3 trace"`

### What makes a good trace
The one sentence explanation is the whole assignment. "I added more context" is not enough. "I removed the instruction to be brief because it was conflicting with my request for a detailed explanation, so Claude stopped averaging the two" is enough.

> **Why use a real prompt from your own history?** Because the goal isn't to pass an exercise — it's to change how you prompt everything, forever. A prompt you actually sent and actually got wrong is more useful than a contrived example. The difference in Claude's responses, tested live in devlens, is the proof.

---

## Week 4 assignment

This week is about how Claude shows up in the real world — the wider tool ecosystem, what changes when code leaves your laptop, and the question underneath all of it: now that you can see how this works, where do *you* stand on using it?

### What to submit
Push one commit to your fork:

**A short reflection — `traces/week-4.md`**

- **Where you land on AI** — Now that you've seen under the hood (no magic, just a wrapper around a model), write where you honestly stand on using AI like this. Do you think you can use it ethically? What are your own conditions for that? Then get concrete: how would you actually use it in your current work or a personal project? *(There's no right answer and your stance isn't graded — if you have reservations, write the reservations.)*
- **One thing that clicked** — Point to one thing in devlens you understand now that you didn't four weeks ago: the messages array, the agent loop, a tool, the handler — whatever finally made sense. A couple of sentences is plenty.
- Commit: `git commit -m "feat: add week-4 reflection"`

A few honest paragraphs is the whole assignment. No code to edit this week.

### Optional stretch
Want to take devlens further? Neither is required:
- **Deploy it** — connect your fork to a host (e.g. Vercel), add your API key as an environment variable (never in the code), and get a live URL. Add the URL to your README.
- **Connect an MCP server** — extend devlens past its four built-in tools and watch the tools array grow.

> **Why an opinion, not just code?** For four weeks the test has been "can you explain it." This week adds the other half: can you decide what to *do* with it? Anyone can use Claude. The developer worth hiring is the one who understands the layer they're working at, owns the decisions, and can say clearly where they draw their own lines. That's the thing a tutorial can't give you — and it's what you've been building all along.

---

## Project structure

```
devlens/
├── index.js      # Express server — starts the app, handles /chat requests
├── api.js        # The agent loop — where the Claude API calls happen
├── tools.js      # Tools Claude can use (read files, run commands, etc.)
├── public/
│   ├── index.html  # The chat UI
│   └── style.css   # Styles
├── CLAUDE.md     # Your personal context file — fill this in!
├── .claude/
│   └── skills/   # Your custom skills live here
├── reflections/  # Your week 2 skill reflection
├── traces/       # Your week 3 trace and week 4 reflection
└── .env          # Your API key (never commit this)
```

---

## Submitting your work

Push your commits to your fork on GitHub and share the link with your instructor.

```bash
git push origin main
```

## Submission links

Below are direct links to the files you submitted for each week. Share your repository URL with your instructor; these files live in this fork.

- Week 1: [CLAUDE.md](CLAUDE.md) and [api.js](api.js)
- Week 2: [reflections/week-2-existing-skill.md](reflections/week-2-existing-skill.md) and [.claude/skills/trace/SKILL.md](.claude/skills/trace/SKILL.md)
- Week 3: [traces/week-3.md](traces/week-3.md)
- Week 4: [traces/week-4.md](traces/week-4.md)
