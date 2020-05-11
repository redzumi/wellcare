type Survey = {
  id: string;
  name: string;
  description: string;
  reward: number;
  questions: Question[];
};

type Question = {
  name: string;
  feature: string;
  reason?: string
  reasonLikes: number;
  reasonDislikes: number;
  weight: number;
  answers: Answer[];
};

type Answer = {
  name: string;
  feature: string;
  weight: number;
};

type SurveysState = {
  data: Survey[];
  ready: boolean;
};
