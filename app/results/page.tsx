"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Result = {
  answer: string;
  isCorrect: boolean;
};

const ResultsPage = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [characterDescription, setCharacterDescription] = useState<string>('');
  const [characterIcon, setCharacterIcon] = useState<string>('');
  const router = useRouter();

  const analyzeResults = (answers: Result[]) => {
    const correctCount = answers.filter(answer => answer.isCorrect).length;

    if (correctCount === 5) {
      setCharacterDescription("You're a Master Word Solver! You guessed all the words correctly and have an eye for details.");
      setCharacterIcon("🎓"); 
    } else if (correctCount >= 3) {
      setCharacterDescription("Great job! You're a Word Enthusiast, guessing most of the words correctly. Keep practicing to become a master!");
      setCharacterIcon("🌟"); 
    } else {
      setCharacterDescription("Keep trying! You're a Word Explorer, and with more practice, you'll improve your word-solving skills.");
      setCharacterIcon("🔍"); 
    }
    
  };

  useEffect(() => {
    const savedAnswers = JSON.parse(sessionStorage.getItem("quizAnswers") || "[]");

    if (Array.isArray(savedAnswers)) {
      setResults(savedAnswers);
      analyzeResults(savedAnswers);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 overflow-hidden relative"
         style={{
           background: `linear-gradient(135deg, rgb(24, 24, 27) 90%, hsl(0, 100%, 64%) 20%)`
         }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-primary p-8 rounded-lg shadow-lg max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-3 bebas-neue-regular">Your 4 Pics 1 Word Results</h1>
        <div className="text-6xl mb-4">{characterIcon}</div>
        <p className="text-xl font-medium mb-6 text-white barlow-condensed-regular-italic">{characterDescription}</p>
        <p className="text-lg text-white font-semibold">
          You answered {results.filter(result => result.isCorrect).length} out of {results.length} correctly.
        </p>
        <motion.button
           onClick={() => {
            sessionStorage.setItem("quizAnswers", JSON.stringify([]));
            router.push("/");
          }}
          className="mt-8 px-6 py-3 bg-secondary text-white rounded-full shadow-lg hover:bg-white hover:text-secondary transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Retake Quiz
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
