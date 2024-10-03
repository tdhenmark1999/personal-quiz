"use client";

import React, { useState, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { useRouter } from "next/navigation";

const questions = [
  { question: "You enjoy being the center of attention in social gatherings." },
  { question: "You prefer deep conversations over small talk." },
  { question: "You feel comfortable taking risks and exploring the unknown." },
  { question: "You like to make detailed plans before starting a project." },
  { question: "You often think about the long-term consequences before making decisions." },
  { question: "You are quick to make decisions without overanalyzing." },
  { question: "You find it easy to empathize with other people's emotions." },
  { question: "You prefer working alone over collaborating with a group." },
  { question: "You are more of a creative person than a practical person." },
  { question: "You thrive in situations where you need to be adaptable and flexible." }
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState({ from: '#bfdbfe', to: '#d8b4fe' });
  const [dragOpacity, setDragOpacity] = useState({ agree: 0, disagree: 0 });
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const cardWidth = cardRef.current?.offsetWidth || 0;
    const threshold = cardWidth * 0.5;

    if (Math.abs(info.offset.x) > threshold) {
      handleOptionClick("Swiped");
    } else {
      setCurrentColor({ from: '#bfdbfe', to: '#d8b4fe' });
      setDragOpacity({ agree: 0, disagree: 0 });
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const opacity = Math.min(Math.abs(info.offset.x) / 200, 1);

    if (info.offset.x > 0) {
      setDragOpacity({ agree: 0, disagree: opacity });
      setCurrentColor({ to: `rgba(239, 68, 68, ${opacity})`, from: 'rgba(239, 68, 68, .4)' });

    } else {
      setDragOpacity({ agree: opacity, disagree: 0 });
      setCurrentColor({ to: 'rgba(34, 197, 94, .4)', from: `rgba(34, 197, 94, ${opacity})` });

    }
  };

  const handleOptionClick = (answer: string) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push("/results");
    }
    setCurrentColor({ from: '#bfdbfe', to: '#d8b4fe' });
    setDragOpacity({ agree: 0, disagree: 0 });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 overflow-hidden relative bg-gradient-to-r from-blue-200 to-purple-300">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${currentColor.from}, ${currentColor.to})`
        }}
      />

      <motion.div
        className="absolute bebas-neue-regular left-16 text-green-600 text-9xl z-0 transform "
        style={{
          opacity: dragOpacity.agree,
          textShadow: "-3px 3px 10px rgba(0, 0, 0, 0.5)"
        }}
      >
        Agree
      </motion.div>

      <motion.div
        className="absolute bebas-neue-regular right-16 text-red-600 text-9xl z-0 transform"
        style={{
          opacity: dragOpacity.disagree,
          textShadow: "3px 3px 10px rgba(0, 0, 0, 0.5)"
        }}
      >
        Disagree
      </motion.div>

      <div className="relative w-full max-w-xl h-full flex flex-col items-center z-10 top-85px">
        <motion.div
          ref={cardRef}
          key={currentQuestionIndex}
          drag="x"
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute w-full p-6 rounded-lg shadow-lg z-20 cursor-pointer bg-white"
          style={{
            boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)"
          }}
        >
          <p className="text-black text-center text-xl font-bold mb-4 bebas-neue-regular">Question {currentQuestionIndex + 1}</p>
          <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-6 barlow-condensed-regular">{questions[currentQuestionIndex].question}</h2>
        </motion.div>
      </div>
      <div className="absolute bottom-10 text-center text-lg font-bold text-gray-700 bebas-neue-regular">
        <p>Swipe left to Agree or right to Disagree</p>
      </div>
    </div>
  );
};

export default QuizPage;
