// @ts-nocheck
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface UsersState {
  users: User[] | null;
  loading: boolean;
  error: string | null;
}

export default interface UserInterface {
  name: string;
  age: number;
  address: string;
  dob: Date;
}
