type Survey = {
  id: string;
  name: string;
  description: string;
  reward: number;
  questions: Question[];
};

type Question = {
  _id?: string; // TODO: fix?
  name: string;
  feature: string;
  reason?: string
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
