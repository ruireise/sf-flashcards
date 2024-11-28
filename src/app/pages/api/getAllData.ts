import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../../utils/connect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //fetching data from mongodb
  if (req.method === "GET") {
    try {
      const { db } = await connect();
      const collection = db.collection("flashcards");

      const flashcards = await collection.find({}).toArray();

      const formattedFlashcards = flashcards.map((flashcard) => ({
        setID: flashcard._id.toString(), // Convert ObjectId to string
        setName: flashcard.setName,
      }));

      console.log("Formatted flashcards:", formattedFlashcards);
      res.status(200).json(formattedFlashcards);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      res.status(500).json({ message: "Something went wrong!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
