type ReasonsState = {
  survey: {
    surveyId: string;
    likes: ReasonReaction[];
    dislikes: ReasonReaction[];
  };
};

type ReasonReaction = {
  surveyId: string;
  feature: string;
};
