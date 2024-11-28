"use client"

import { useEffect, useState } from 'react';

type FlashcardSet = {
  setID: string;
  setName: string;
};

export default function Sidebar() {

  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);

  // Fetch flashcard sets when the component mounts
  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const response = await fetch('/api/getAllData');
        console.log("Raw response:", response);
        const text = await response.json();
        setFlashcardSets(data); // Update the state with the fetched flashcards
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    }
    fetchFlashcards();
  }, []);

    //Creates UI layout for the sidebar
    return (
      <div className="w-full bg-gray-800 text-white p-4 overflow-auto">
        <h2 className="text-xl font-semibold">Flashcard Sets</h2>
        <ul className="mt-4">
        {flashcardSets.map((flashcardSet) => (
          <li
            key={flashcardSet.setID}
            className="py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
          >
            <a href={`/flashcards/${flashcardSet.setID}`}>{flashcardSet.setName}</a>
          </li>
        ))}
        </ul>
      </div>
    );
  }
  