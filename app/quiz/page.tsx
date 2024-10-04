"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { questions } from "./../data/questions";

type QuestionType = {
  question: string;
  images: string[];
  solution: string;
};

const shuffleArray = (array: string[]): string[] => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];
  const { solution } = currentQuestion;

  useEffect(() => {
    const shuffled = shuffleArray(currentQuestion.images);
    setShuffledImages(shuffled);
  }, [currentQuestionIndex]);

  const fastShuffle = () => {
    let shuffleCount = 0;
    const interval = setInterval(() => {
      setShuffledImages((prevImages) => shuffleArray([...prevImages]));
      shuffleCount++;
      if (shuffleCount >= 15) {
        clearInterval(interval);
      }
    }, 200);
  };

  const handleOptionClick = (guess: string) => {
    if (guess.toLowerCase() === solution.toLowerCase()) {
      setSolved(true);
      setError(false);
      fastShuffle();
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          router.push("/results");
        }
        setSolved(false);
      }, 3000);
    } else {
      setError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, rgb(24, 24, 27) 90%, hsl(0, 100%, 64%) 20%)`
      }}
    >
      <div className="relative w-full max-w-xl h-full flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative grid grid-cols-2 grid-rows-2 gap-2 p-4"
        >
          {shuffledImages.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Puzzle Image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              style={{ boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              layout
            />
          ))}
        </motion.div>

        {!solved && (
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            type="text"
            placeholder="Guess the word"
            className="mt-6 px-4 py-2 rounded-lg border focus:outline-none shadow-md text-black"
            style={{
              borderColor: "hsl(0, 100%, 64%)",
              color: "rgb(24, 24, 27)",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleOptionClick(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
            onChange={() => setError(false)}
          />
        )}

        {solved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-6 font-bold absolute -bottom-10"
            style={{ color: "hsl(120, 100%, 40%)" }}
          >
            Correct! Shuffling images...
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-6 font-bold absolute -bottom-10"
            style={{ color: "hsl(0, 100%, 64%)" }}
          >
            Incorrect! Please try again.
          </motion.div>
        )}
      </div>

      <div
        className="absolute bottom-10 text-center text-lg font-bold"
        style={{ color: "hsl(0, 100%, 64%)" }}
      >
        <p>Guess the word that connects the images!</p>
      </div>
    </motion.div>
  );
};

export default QuizPage;
