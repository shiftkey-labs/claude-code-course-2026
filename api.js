const fs = require("node:fs");
const path = require("node:path");
const Anthropic = require("@anthropic-ai/sdk");
const { toolDefinitions, handleToolCall } = require("./tools");

const MODEL = "claude-sonnet-4-6";

const MAX_ITERATIONS = 10;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function loadSystemPrompt() {
  const base =
    "You are devlens, an AI assistant embedded in the user's project directory. " +
    "You have tools for reading files, writing files, running shell commands, " +
    "and listing directories. When the user asks a question that depends on the " +
    "contents of the codebase, use the tools — do not guess.";

  const claudeMdPath = path.resolve(process.cwd(), "CLAUDE.md");
  if (!fs.existsSync(claudeMdPath)) return base;

  const claudeMd = fs.readFileSync(claudeMdPath, "utf-8");
  return `${base}\n\n--- Project context (from CLAUDE.md) ---\n${claudeMd}`;
}
async function chat(userMessage, history) {

  const messages = [...history, { role: "user", content: userMessage }];
  const trace = [];
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: loadSystemPrompt(),
      tools: toolDefinitions,
      messages,
    });

    messages.push({ role: "assistant", content: response.content });

    for (const block of response.content) {
      if (block.type === "text") {
        trace.push({ type: "text", text: block.text });
      } else if (block.type === "tool_use") {
        trace.push({ type: "tool_use", id: block.id, name: block.name, input: block.input });
      }
    }

    const toolUses = response.content.filter((b) => b.type === "tool_use");
    if (toolUses.length === 0) {
      const reply = response.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n");
      return { reply, history: messages, trace, iterations: i + 1 };
    }

    const toolResults = [];
    for (const block of toolUses) {
      const result = await handleToolCall(block.name, block.input);
      toolResults.push({ type: "tool_result", tool_use_id: block.id, content: result });
      trace.push({ type: "tool_result", tool_use_id: block.id, name: block.name, content: result });
    }
    messages.push({ role: "user", content: toolResults });
  }

  return {
    reply: `(Stopped after ${MAX_ITERATIONS} iterations — Claude kept asking for tools. Task may be incomplete. Raise MAX_ITERATIONS in api.js if this is expected.)`,
    history: messages,
    trace,
    iterations: MAX_ITERATIONS,
  };
}

module.exports = { chat };
