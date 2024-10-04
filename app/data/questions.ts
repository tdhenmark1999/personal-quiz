type QuestionType = {
  question: string;
  images: string[];
  solution: string;
  hint: string; 
};

export const questions: QuestionType[] = [
  {
    question: "Some question text",
    images: [
      "https://kbob.github.io/images/sample-5.jpg",
      "https://kbob.github.io/images/sample-5.jpg",
      "https://cdn.photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg",
      "https://kbob.github.io/images/sample-5.jpg"
    ],
    solution: "word1",
    hint: "This is the hint for word1.",
  },
  {
    question: "Some question text",
    images: [
      "https://kbob.github.io/images/sample-5.jpg",
      "http://www.cameraegg.org/wp-content/uploads/2012/09/nikon-d600-sample-images.jpg",
      "https://kbob.github.io/images/sample-5.jpg",
      "https://cdn.photographylife.com/wp-content/uploads/2014/06/Nikon-D810-Image-Sample-6.jpg"
    ],
    solution: "word2",
    hint: "This is the hint for word2.", 
  },
  {
    question: "Some question text",
    images: [
      "https://kbob.github.io/images/sample-5.jpg",
      "https://kbob.github.io/images/sample-5.jpg",
      "https://kbob.github.io/images/sample-5.jpg",
      "https://kbob.github.io/images/sample-5.jpg"
    ],
    solution: "word3",
    hint: "This is the hint for word3.", 
  }
];
