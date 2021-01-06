import { User } from "../../types";

export const ADD_USER = (payload: User) => {
  return {
    type: "ADD_USER",
    payload,
  };
};
