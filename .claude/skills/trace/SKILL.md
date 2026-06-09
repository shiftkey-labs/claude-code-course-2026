---
name: trace
description: >-
  Trace a single devlens tool call (read_file, write_file, run_command, or
  list_files) end-to-end through the codebase — from the browser request in
  index.js, through the agent loop in api.js, to the handler in tools.js and
  back. Use when the user asks "how does <tool> work", "trace <tool>", or wants
  to follow one tool through the request/response cycle.
---

# /trace — follow one tool call through devlens

You are tracing **one** devlens tool, named in `$ARGUMENTS`, through its complete
round trip. devlens is a small AI assistant with exactly four tools, so every
trace touches the same three files in the same order:

```
index.js  →  api.js  →  tools.js  →  api.js  →  Claude
(server)     (loop)      (handler)    (loop)
```

## Step 1 — validate the argument

`$ARGUMENTS` must be one of the four real tools. If it is empty or not in this
list, stop and tell the user the valid options:

- `read_file`
- `write_file`
- `run_command`
- `list_files`

## Step 2 — read the three files before tracing

Always read these first so your line numbers are real, not remembered:

1. `index.js` — find the `/chat` route.
2. `api.js` — find the agent loop and where it dispatches tools.
3. `tools.js` — find the tool's definition, the router case, and its handler.

## Step 3 — produce the trace in this exact format

Output **seven numbered hops**. For every hop give: the **file:line** (as a
clickable markdown link), and **one sentence** on what happens. End with a
**"What could break"** note specific to the traced tool.

### Required output template

> **Tracing `<tool>` through devlens**
>
> 1. **Browser → server** — `[index.js:27](index.js#L27)` — the `POST /chat`
>    route receives `{ message, history }` and calls `chat()`.
> 2. **Enter the agent loop** — `[api.js:30](api.js#L30)` — `chat()` sends the
>    messages array to Claude with the full `toolDefinitions` list.
> 3. **Claude asks for the tool** — `[api.js:48](api.js#L48)` — the response is
>    scanned for `tool_use` blocks; `<tool>` appears here with its input.
> 4. **Dispatch** — `[api.js:59](api.js#L59)` — `handleToolCall(name, input)`
>    is called with `name = "<tool>"`.
> 5. **Router** — `[tools.js:152](tools.js#L152)` — the switch matches
>    `case "<tool>"` and calls its handler `<handlerFn>()`.
> 6. **Handler runs on the machine** — `[tools.js:<line>](tools.js#L<line>)` —
>    `<one sentence on what THIS tool's handler actually does>`; returns a string.
> 7. **Result back to Claude** — `[api.js:63](api.js#L63)` — the returned string
>    becomes a `tool_result` block, pushed to messages; the loop repeats until
>    Claude stops asking.
>
> **What could break for `<tool>`:** `<one tool-specific risk>`

## Step 4 — fill the tool-specific blanks

Use the correct handler name, line, and risk for the traced tool:

| `$ARGUMENTS` | Handler (hop 6) | Tool-specific risk to mention |
|---|---|---|
| `read_file`    | `readFile` — `[tools.js:233](tools.js#L233)`   | No error handling — reading a missing file **throws** and crashes the turn (the Week 1 gap). |
| `write_file`   | `writeFile` — `[tools.js:191](tools.js#L191)`  | The `startsWith(process.cwd())` guard at `[tools.js:202](tools.js#L202)` is the only thing stopping a `../../` path escape. |
| `run_command`  | `runCommand` — `[tools.js:243](tools.js#L243)` | No sandbox — any shell string Claude sends runs on the user's machine. |
| `list_files`   | `listFiles` — `[tools.js:263](tools.js#L263)`  | A bad path is caught and returned as a string, so Claude can recover next turn. |

## Example invocation

**User:** `/trace read_file`

**You produce:** the seven-hop trace above with `read_file` / `readFile` /
`tools.js:233` filled in, ending with the "throws on missing file" risk and a
pointer to the Week 1 hands-on gap at `[tools.js:233](tools.js#L233)`.

## Rules

- Use **real** line numbers from the files you just read — if the code has
  shifted, re-read and correct them. Never trust these numbers blindly.
- Keep each hop to **one sentence**. The value is the *path*, not prose.
- Always render file references as clickable `[file.js:NN](file.js#LNN)` links.
