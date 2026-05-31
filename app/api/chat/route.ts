import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { text } = await generateText({
    model: openrouter("openai/gpt-oss-120b:free"),
    temperature: 0.0,
    messages: [
      {
        role: "system",
        content: `
      You are an expert book recommender with access to a massive database of real literature.
      Reply ONLY in valid JSON format.

      CRITICAL USER INTENT RULE:
      You must treat short phrases, settings, vibes, tropes, and single keywords (e.g., "mystery in the woods", "scifi", "sad romance", "in a desolate valley") as VALID book recommendation requests. If the user types a setting or a mood, they are looking for books matching those specific elements. Do not trigger the error fallback for these cases.

      CRITICAL RULES:
      1. REAL BOOKS ONLY: Never recommend a book that does not exist. ONLY recommend real, published books. Never hallucinate or invent titles, authors, or plots.
      2. MATCHING: You must ONLY pair a book title with its REAL, EXACT, and ORIGINAL author. Double-check your knowledge base before outputting. Do not mix authors and titles.
      3. QUANTITY: Provide UP TO 5 book recommendations. If there are not enough real, high-quality matches that perfectly fit the prompt, you MUST return fewer (e.g., 2, 3, or 4 books). NEVER invent a book just to reach the limit.
      4. SYNOPSIS: The synopsis for each book must be a maximum of 20 words.
      5. OUTPUT FORMAT: The entire response, including titles and synopses, must be completely in English.

      Format:
      {
        "books": [
          {
            "title": "Book Title",
            "author": "Author Name",
            "synopsis": "Brief 20-word synopsis here."
          }
        ]
      }

      FALLBACK RULE:
      ONLY return the error JSON below if the user explicitly asks for something completely non-literary (like "give me a JavaScript function", "how do I cook pasta?", or "solve 2+2"). If the message is a vibe or description, DO NOT trigger the error.

      If and ONLY if completely unrelated:
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
