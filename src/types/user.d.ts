export type UserModel = {
  _id: string;
  email: string;
  passwordHash: string;
};

export type UserRequestData = {
  email: string;
  password: string;
};
