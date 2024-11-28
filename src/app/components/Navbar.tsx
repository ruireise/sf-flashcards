"use client"

import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 fixed w-full">
      <div className="justify-end">
        {/* Logo aligned to the left */}
        <div className="text-xl font-semibold flex-1">
          Studyfetch Flashcards
        </div>
      </div>
    </nav>
  );
}