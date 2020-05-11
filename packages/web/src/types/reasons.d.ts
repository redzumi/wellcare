type ReasonsState = {
  surveys: SurveyReasonReactions;
};

type SurveyReasonReactions = {
  [key: string]: SurveyReasonReaction;
};

type SurveyReasonReaction = {
  likes: {
    [key: string]: string[];
  };
  dislikes: {
    [key: string]: string[];
  };
};
