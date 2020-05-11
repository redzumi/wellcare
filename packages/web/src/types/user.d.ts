declare const enum UserRole {
  Default = 0,
  Admin = 1
}

type ReasonReaction = {
  surveyId: string;
  feature: string;
};

type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  role?: UserRole;
  reasonsLike: ReasonReaction[];
  reasonsDislike: ReasonReaction[];
};
