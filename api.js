/**
 * This module defines the main chat function that interacts with the Anthropic API. 
 * It maintains a conversation history, handles tool calls, and constructs the system prompt 
 * based on the CLAUDE.md file in the project directory.
 * 
 * After I populated CLAUDE.md with relevant information myself, I found that Claude was able to answer questions about the codebase such that I can understand it better; suitable to my learning style. For example, I like to be taught in levels from a 5-year old level upto a university student level, and Claude was able to adapt its explanations accordingly when I asked follow-up questions. 
 * 
 * I also found that the tool calls were useful for getting specific information from the codebase that Claude could then use to answer my questions more effectively. Overall, this module is responsible for orchestrating the conversation between the user and Claude, ensuring that the right context is provided and that tool calls are handled appropriately.
 */


const fs = require("node:fs");
const path = require("node:path");
const Anthropic = require("@anthropic-ai/sdk");
const { toolDefinitions, handleToolCall } = require("./tools");

// using sonnet-4.5
const MODEL = "claude-sonnet-4-6";

// To prevent infinite loops where Claude keeps asking for tools without ever giving a final reply,
const MAX_ITERATIONS = 10;

// load the API key from the environment and create a client instance
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * Function to load basic system prompt
 * If a CLAUDE.md file exists in the current working directory, its contents are appended to the system prompt.
 * This allows users to provide additional context about their project that Claude can use to answer questions more effectively.
 */

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

/**
 * Main chat function to interact with the Anthropic API
 * The function takes a user message and the conversation history, sends them to the API, and processes the response.
 * It handles tool calls by executing the corresponding functions and feeding the results back into the conversation; 
 * until either a final reply is generated or the maximum number of iterations is reached.
 * 
 * @param {*} userMessage : A string containing the user's latest message or question.
 * @param {*} history : An array of message objects representing the conversation history. Each message has a 'role' (either 'user' or 'assistant') and 'content' (the text of the message).
 * 
 * @returns An object containing the assistant's reply, the updated conversation history, a trace of the interaction, and the number of iterations taken.
 */
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

// Export the chat function so it can be used in other modules (like index.js)
module.exports = { chat };
