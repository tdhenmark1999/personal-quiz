"use client";

import Link from "next/link";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Personality Quiz!</h1>
        <p className="text-gray-600 mb-6">Discover your personality type in just a few steps.</p>
        <Link href="/quiz" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition">
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
