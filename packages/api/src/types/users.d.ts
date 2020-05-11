declare const enum UserRole {
  Default = 0,
  Admin = 1
}

type User = {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  role: UserRole;
  reasonsLike: ReasonReaction[];
  reasonsDislike: ReasonReaction[];
};

type ReasonReaction = {
  surveyId: string;
  feature: string;
};
