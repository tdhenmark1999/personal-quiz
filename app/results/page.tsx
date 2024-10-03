"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { questions } from './../data/questions'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

type Result = {
  question: string;
  selectedOption: string;
};

const ResultsPage = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [personalityType, setPersonalityType] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const savedAnswers = JSON.parse(sessionStorage.getItem("quizAnswers") || "[]");

    if (Array.isArray(savedAnswers)) {
      const resultsWithQuestions = savedAnswers.map((item, index) => ({
        question: questions[index].question,
        selectedOption: item.value
      }));

      setResults(resultsWithQuestions);
      analyzeResults(resultsWithQuestions);
    }
  }, []);

  const analyzeResults = (answers: Result[]) => {
    const agreeCount = answers.filter(answer => answer.selectedOption === "Agree").length;
    const disagreeCount = answers.filter(answer => answer.selectedOption === "Disagree").length;
  
    if (agreeCount > disagreeCount) {
      if (agreeCount > 7) {
        setPersonalityType("You are highly extroverted and thrive in social situations. You enjoy engaging with others and often take the lead in group activities.");
      } else {
        setPersonalityType("You tend to be social and outgoing. You thrive in social situations and enjoy engaging with others.");
      }
    } else {
      if (disagreeCount > 7) {
        setPersonalityType("You are highly introverted and prefer solitary activities. You value deep thought and often take your time to make decisions.");
      } else {
        setPersonalityType("You prefer introspection and careful planning. You may enjoy solitary activities and value thoughtful decision-making.");
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-300 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-3 bebas-neue-regular">Your Quiz Results</h1>
        <p className="text-xl font-medium mb-4 text-gray-800 barlow-condensed-regular-italic mb-6">"{personalityType}"</p>
        <div className="mb-6 question-container">
            <Slider {...settings}>
            {results.map((answer, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-100 rounded-md p-4 text-gray-800 text-left shadow-sm"
                >
                <p className="barlow-condensed-medium">
                    Q{index + 1}: {answer.question}
                </p>
                <p className="text-blue-500 font-semibold mt-1 barlow-condensed-regular">
                    <span className="barlow-condensed-medium">Your Answer:</span> {answer.selectedOption}
                </p>
                </motion.div>
            ))}
            </Slider>
         </div>
        <motion.button
           onClick={() => {
            sessionStorage.setItem("quizAnswers", JSON.stringify([]));
            router.push("/");
          }}
          className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
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
