type QuestionType = {
  images: string[];
  solution: string;
  hint: string; 
};

export const questions: QuestionType[] = [
  {
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f", 
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a"
    ],
    solution: "introvert",
    hint: "People who prefer quiet and solitude.",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4", 
      "https://plus.unsplash.com/premium_photo-1686836995180-06df3b20884e",
      "https://plus.unsplash.com/premium_photo-1679547202671-f9dbbf466db4", 
      "https://images.unsplash.com/photo-1593739742226-5e5e2fdb1f1c"
    ],
    solution: "extrovert",
    hint: "A person who gains energy from being around others.",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1483301563007-8d0161daa1d0", 
      "https://images.unsplash.com/photo-1502920514313-52581002a659", 
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7", 
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335" 
    ],
    solution: "adventurous",
    hint: "People who love to explore and take risks.",
  },
  {
    images: [
      "https://plus.unsplash.com/premium_photo-1682608389237-f4b698f5af82", 
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70", 
      "https://plus.unsplash.com/premium_photo-1681996629585-88965b0d5c83",
      "https://plus.unsplash.com/premium_photo-1661769800950-a36da6a69d44" 
    ],
    solution: "empathetic",
    hint: "People who easily understand and share the feelings of others.",
  },
  {
    images: [
      "https://plus.unsplash.com/premium_photo-1706544427087-9f8747c5c675", 
      "https://images.unsplash.com/photo-1644329843283-640d00509d43",
      "https://images.unsplash.com/photo-1484981184820-2e84ea0af397", 
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe" 
    ],
    solution: "organized",
    hint: "Someone who likes to keep things in order and prepare in advance.",
  }
];
