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

export const getUserData = async (token: string) => {
  const res = await fetch(`${USERS_ENDPOINT}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 200) {
    const user = await res.json();
    return user;
  } else {
    const error = await res.json();
    throw error;
  }
};

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
  const res = await fetch(`${USERS_ENDPOINT}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userInfo),
  });
  if (res.status === 201) {
    const credentials = await res.json();
    return credentials;
  } else {
    const error = await res.json();
    console.log(error);
    throw error;
  }
};
