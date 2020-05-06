type Survey = {
  _id?: string;
  id: string;
  name: string;
  description: string;
  reward: number;
  questions: Question[];
};

type Question = {
  name: string;
  weight: number;
  reason?: string;
  feature: string;
  answers: Answer[];
};

type Answer = {
  name: string;
  weight: number;
  feature: string;
};

type surveyQA = {
  name: string;
  weight: number;
  feature: string;
  answer: {
    name: string;
    weight: number;
    feature: string;
  };
};
