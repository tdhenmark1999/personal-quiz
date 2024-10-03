"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  { question: "You enjoy vibrant social events with lots of people.", options: ["Agree", "Neutral", "Disagree"] },
 
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-blue-200 p-6">
      <div className="text-center max-w-xl p-4">
        <h2 className="text-2xl font-bold">{questions[currentQuestionIndex].question}</h2>
        <div className="mt-4">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="block w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
