"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { questions } from "./../data/questions";

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
  const [timeLeft, setTimeLeft] = useState(120);
  const [hintUsed, setHintUsed] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];
  const { solution, hint } = currentQuestion;

  useEffect(() => {
    const shuffled = shuffleArray(currentQuestion.images);
    setShuffledImages(shuffled);
  }, [currentQuestionIndex]);

  useEffect(() => {
    sessionStorage.setItem("quizAnswers", JSON.stringify([]));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timerActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft <= 0) {
      clearInterval(timer!);
      storeAnswer(false);
      goToNext();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, timerActive]);

  const fastShuffle = () => {
    let shuffleCount = 0;
    const interval = setInterval(() => {
      setShuffledImages((prevImages) => shuffleArray([...prevImages]));
      shuffleCount++;
      if (shuffleCount >= 15) {
        clearInterval(interval);
        setTimerActive(true);
      }
    }, 200);
  };

  const handleOptionClick = (guess: string) => {
    const isCorrect = guess.toLowerCase() === solution.toLowerCase();

    if (isCorrect) {
      setSolved(true);
      setError(false);
      setTimeLeft(120);
      setTimerActive(false);
      storeAnswer(true);

      fastShuffle();
      setTimeout(() => {
        goToNext();
      }, 3000);
    } else {
      setError(true);
    }
  };

  const storeAnswer = (isCorrect: boolean) => {
    const existingAnswers = JSON.parse(sessionStorage.getItem("quizAnswers") || "[]");
    const updatedAnswers = [
      ...existingAnswers,
      {
        answer: currentQuestion.solution,
        isCorrect,
      },
    ];
    sessionStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(120);
      setHintUsed(false);
      setTimerActive(true);
    } else {
      router.push("/results");
    }
    setSolved(false);
  };

  const handleHintClick = () => {
    setTimeLeft((prev) => prev - 30);
    setHintUsed(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, rgb(24, 24, 27) 90%, hsl(0, 100%, 64%) 20%)`,
      }}
    >
      <div className="relative w-full max-w-xl h-full flex flex-col items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-white text-xl font-bold mb-4"
        >
          Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </motion.div>

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
          <>
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
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
              onClick={handleHintClick}
              disabled={hintUsed || timeLeft <= 30} // Disable hint if already used or time is below 30 seconds
              className={`mt-4 px-4 py-2 rounded-full transition-all ${hintUsed || timeLeft <= 30 ? "bg-primary cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 text-white"}`}
            >
              {hintUsed ? hint : "Get a Hint (-30s)"}
            </motion.button>
          </>
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
