"use client"

import { useState, useRef, useEffect } from 'react';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

type ChatModuleProps = {
  messages: Message[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => Promise<void>;
};

export default function ChatModule({ messages, input, setInput, sendMessage }: ChatModuleProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  //handles input of messages and submission
  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
    setInput('');
  };

  //scroll to bottom when new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex justify-end w-full h-full">
      <div className="w-full p-2 bg-gray-100">
        <div className="flex flex-col space-y-4 h-full">
          <div className="flex-1 overflow-auto p-4 bg-white rounded-lg shadow-md flex flex-col min-h-[700px] max-h-[700px]">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500">Type a message to start a conversation with your personal AI!</div>
            ) : (
              messages.map((msg, index) => (
                <div key={index}
                className={`p-2 text-sm rounded-md mb-2 max-w-[50%] break-words whitespace-pre-wrap inline-block relative
                ${msg.sender === 'user' ? 'bg-blue-200 self-end text-right' : 'bg-gray-200 self-start text-left'}`}
                style={{ wordBreak: 'break-word' }}>
                  {msg.text}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Dialog Bar */}
          <form onSubmit={handleMessageSubmit} className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleMessageSubmit(e);
              }}
              className="flex-1 p-2 border rounded-lg"
              placeholder="Type a message..."
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
