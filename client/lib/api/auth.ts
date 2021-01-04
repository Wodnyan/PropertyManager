import { API_ENDPOINT } from "../../constants";

const USERS_ENDPOINT = `${API_ENDPOINT}/users`;

interface SignUpParams {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export const login = async (userInfo: LoginParams) => {
  const res = await fetch(`${USERS_ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userInfo),
  });
  const credentials = await res.json();
  return credentials;
};

export const signUp = async (userInfo: SignUpParams) => {
  console.log("Here")
  const res = await fetch(`${USERS_ENDPOINT}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userInfo),
  });
  const credentials = await res.json();
  return credentials;
};
