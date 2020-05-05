type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  role?: UserRole;
};

declare const enum UserRole {
  Default = 0,
  Admin = 1
}
