"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center"   style={{
      background: `linear-gradient(135deg, rgb(24, 24, 27) 90%, hsl(0, 100%, 64%) 20%)`
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center bg-primary p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-extrabold mb-6 text-white">
        4 Pics 1 Word Challenge!
        </h1>
        <p className="text-white mb-6">
          Can you guess the word that links all four images? Test your skills and have fun!
        </p>
        <Link href="/quiz" onClick={() => sessionStorage.setItem("quizAnswers", JSON.stringify([]))}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-secondary text-white px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-secondary transition-all"
          >
            Start Quiz
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
