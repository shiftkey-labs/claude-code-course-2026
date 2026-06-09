# Week 2 — Reflection on an existing skill: `deep-research`

## The skill I picked

**`deep-research`** — a harness that fans out web searches, fetches sources,
adversarially verifies the claims it finds, and synthesizes a cited report.

## Why this skill could help me

As a graduate student in Computing and Data Analytics, a lot of my work is not
coding — it is reading across many sources, separating solid claims from weak
ones, and writing something defensible with citations. `deep-research` maps
onto that exactly:

- **It searches more broadly than I would by hand**, then *fetches and reads*
  the sources instead of just listing links.
- **It verifies before it trusts** — the adversarial check step is the part I
  care about most, because the risk in research is a confident-but-wrong claim,
  not a missing one.
- **It produces cited output**, which is the format my coursework already needs.

## How it connects to the tool-use cycle (Week 2's theme)

`deep-research` is a bigger version of the same loop devlens runs: instead of
`read_file` / `run_command`, its "tools" are web search and fetch. Same shape —
Claude asks for a tool, the tool runs, the result comes back, Claude decides
what to do next — just pointed at the open web instead of my project folder.

### Example

Research question:  What Claude is doing different than Gemini, OpenAI (ChatGPT), DeepSeek, Grok, Meta-Ollama that makes it popular than any other LLMs?

I actually ran `/deep-research` on this question. What convinced me wasn't the
polished final summary — it was watching it **kill 7 of 25 claims**, including
several of Anthropic's own marketing lines (e.g. "engineers ship 3x more code,"
"4x less likely to let code flaws pass"), while keeping the structural facts that
independent sources backed up (Claude leading SWE-Bench Verified, MCP becoming a
cross-vendor standard donated to the Linux Foundation, the constitution's four
ordered goals). That refute-step is the difference between a search engine and a
research assistant: it doesn't just find claims, it tries to break them before it
trusts them. For my coursework, that is exactly the property I need — I care more
about not citing a confident-but-wrong claim than about finding one more source.
