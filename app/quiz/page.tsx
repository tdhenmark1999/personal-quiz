"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const questions = [
  { question: "You enjoy vibrant social events with lots of people.", options: ["Agree", "Neutral", "Disagree"] }
];

const QuizPage = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
    const router = useRouter(); 
  
    const handleOptionClick = (answer: string) => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        router.push("/results");
      }
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-blue-200 p-6 overflow-hidden relative">
    <div className="relative w-full max-w-xl h-full flex flex-col items-center">
      {questions.map((q, index) => {
        const isActive = index === currentQuestionIndex;
        const isAbove = index < currentQuestionIndex;
        const isBelow = index > currentQuestionIndex;

        return (
          <motion.div
            key={index}
            initial={{ opacity: isActive ? 1 : 0.5, y: isAbove ? -50 : isBelow ? 50 : 0, scale: isActive ? 1 : 0.9 }}
            animate={{ opacity: isActive ? 1 : 0.5, y: isAbove ? -50 : isBelow ? 50 : 0, scale: isActive ? 1 : 0.9 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute w-full p-6 rounded-lg shadow-lg ${isActive ? "z-20 cursor-pointer" : "z-10"}`}
            style={{
              background: "white",
              filter: isActive ? "none" : "blur(2px)",
              boxShadow: isActive
                ? "0px 15px 25px rgba(0, 0, 0, 0.2)"
                : "0px 10px 20px rgba(0, 0, 0, 0.1)",
              pointerEvents: isActive ? "auto" : "none", 
            }}
          >
            <h2 className={`text-lg font-bold ${isActive ? "text-black" : "text-gray-500"}`}>{q.question}</h2>
            <div className="space-y-2 mt-4">
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full py-2 rounded-full ${isActive ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
  );
};

export default QuizPage;
