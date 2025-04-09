import React from 'react';
import Chatbot from './components/Chatbot';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <header className="py-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">E-Waste Management Assistant</h1>
          <p className="text-gray-300">Your AI guide to responsible electronic waste disposal</p>
        </header>
        <Chatbot />
      </div>
    </main>
  );
}