import { post } from "./index";

export const login = <T>({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return post<T>("/login", { email, password });
};

export const register = <T>({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return post<T>("/signup", { email, password });
};
