"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
          Take the Personality Quiz!
        </h1>
        <p className="text-gray-600 mb-6">
          Discover your personality type in just a few steps.
        </p>
        <Link href="/quiz" onClick={() => sessionStorage.setItem("quizAnswers", JSON.stringify([]))}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 transition-all"
          >
            Start Quiz
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
