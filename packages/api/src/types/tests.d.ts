type Test = {
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
  answers: Answer[];
};

type Answer = {
  name: string;
  weight: number;
};
