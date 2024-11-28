//This api is incomplete
import { connect } from '../../../../utils/connect';

// Interface for the flashcard set
interface Flashcard {
  front: string;
  back: string;
  category: string;
}

// Function to create flashcard set using Anthropic
async function createFlashcardSet(topic: string): Promise<Flashcard[]> {
  try {
    //tool use calls
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ANTHROPIC_API_KEY}`, 
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        tools: [
          {
            name: "create_flashcard_set",
            description: "Create flashcards based on the given topic",
            input_schema: {
              type: "object",
              properties: {
                topic: {
                  type: "string",
                  description: "The topic to create flashcards for",
                },
                category: {
                  type: "string",
                  description: "Optimal category for flashcards",
                },
              },
              required: ["topic"],
            },
          },
        ],
        messages: [
          {
            role: "user",
            content: `Create flashcards for the topic: ${topic}`,
          },
          {
            role: "assistant",
            content: [
              {
                type: "text",
                text: "Let me create flashcards using the create_flashcard_set tool.",
              },
              {
                type: "tool_use",
                name: "create_flashcard_set",
                input: {topic}
              }
            ]
          }
        ],
      }),
    });

    const data = await response.json();

    return data.flashcards || [];

  } catch (error) {
    console.error("Error generating flashcards:", error);
    return [];
  }
}

//save the flashcards to MongoDB
//Can perhaps be integrated with the code above
async function saveFlashcardSet(topic: string, flashcards: Flashcard[]) {
  try {
    const { db } = await connect();
    const flashcardSet = {
      setName: topic,
      flashcards,
    };
    const result = await db.collection("flashcards").insertOne(flashcardSet);
    return result.insertedId;
  } catch (error) {
    console.error("Error saving flashcards to MongoDB:", error);
    throw error;
  }
}