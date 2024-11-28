//Incomplete and untested flashcard page
//This is mostly a template, I never got to see it happen
//due to connection and data loading error
"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Flashcard = {
  front: string;
  back: string;
  category: string;
};

export default function FlashcardSet() {
  const { query } = useRouter();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    if (query.setID) {
      async function fetchFlashcards() {
        const response = await fetch(`/api/getAllData/${query.setID}`);
        const data = await response.json();
        setFlashcards(data.flashcards); // Display the flashcards
      }

      fetchFlashcards();
    }
  }, [query.setID]);

  return (
    <div>
      <h2>Flashcard Set</h2>
      {flashcards.map((flashcard, index) => (
        <div key={index}>
          <h3>{flashcard.front}</h3>
          <p>{flashcard.back}</p>
        </div>
      ))}
    </div>
  );
}
