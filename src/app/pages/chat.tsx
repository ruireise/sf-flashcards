//This function serves as the API caller and a bridge between
//the ai and the ChatModule (which is the UI)
"use client"

import { useState, useEffect } from 'react';
import ChatModule from '../components/ChatModule';

// Chat component to handle logic
export default function Chat () {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState<string>('');

  // Function to send a message to the API
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const newUserMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newUserMessage]); 

    // Send the message to the API
    const res = await fetch('/api/chatanthropic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    // Add AI response to the chat
    const newAIMessage = { sender: 'ai', text: data.reply };
    setMessages((prev) => [...prev, newAIMessage]);

    setInput(''); // Clear the input field
  };

  return (
    //pass elements to ChatModule component
    <ChatModule
      messages={messages}
      input={input}
      setInput={setInput}
      sendMessage={sendMessage}
    />
  );
};

