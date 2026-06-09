# Week 4 — Reflection

## Where I land on AI

Having inspected devlens and how Claude runs the agent loop, I feel cautiously optimistic about using AI as a developer tool. I see it as a powerful assistant for exploring code, triaging errors, and drafting explanations — especially when I provide clear context and constraints. My conditions for use are: 1) never sharing secrets or private keys, 2) verifying any code suggestions before running them locally, and 3) preferring tools that make their actions auditable (logs, traces, or explicit tool results).

I would use Claude-style assistants for: rapid code understanding, generating drafts of documentation or tests, and automating routine repo tasks (formatting, simple refactors). I would not rely on them for security-sensitive decisions, final design authority, or replacing critical human review.

## One thing that clicked

The messages array + tool loop clarified everything: the conversation state is just an append-only log that both guides the model and records tool inputs/results — that design makes tool calls deterministic and auditable, and explains why adding `CLAUDE.md` changed Claude's answers for me.


(End of reflection)
