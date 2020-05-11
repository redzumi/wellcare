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
  reasonsLike: ReasonAction[];
  reasonDislike: ReasonAction[];
};

type ReasonAction = {
  surveyId: string;
  feature: string;
};
