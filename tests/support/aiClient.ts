import OpenAI from "openai";

/**
 * Initializes the OpenAI client using the API key stored in the environment variables.
 */
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Sends a prompt to the AI model and returns the generated response.
 * @param prompt - The text instruction or question you want to send to the AI.
 */
export async function askAI(prompt: string) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return response.choices[0].message.content;
}