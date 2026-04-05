import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { text } = await generateText({
    model: openrouter("openai/gpt-oss-20b:free"),
    messages: [
      {
        role: "system",
        content: `
      You're an expert book recommender.
      Reply ONLY in valid JSON format.

      Rules:
      - Return EXACTLY 3 books.
      - Don't make up books.
      - Synopsis maximum 20 words.

      Format:

      {
        "books": [
          {
            "title": "",
            "author": "",
            "synopsis": ""
          }
        ]
      }

      If it's not a book request, answer:
      {
        "error": "Sorry, I can only help you find books."
      }
      `,
      },
      ...messages,
    ],
  });

  return Response.json({ text });
}
