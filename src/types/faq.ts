export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: string;
  createdAt: string;
}

// question: {
//   en: { type: String, required: true },
//   hi: { type: String },
//   bn: { type: String },
// },
// answer: {
//   en: { type: String, required: true },
//   hi: { type: String },
//   bn: { type: String },
// },