"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  { question: "You enjoy vibrant social events with lots of people.", options: ["Agree", "Neutral", "Disagree"] },
 
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
     
    </div>
  );
};

export default QuizPage;
