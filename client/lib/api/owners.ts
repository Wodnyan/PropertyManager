import { API_ENDPOINT } from "../../constants";

const OWNERS_ENDPOINT = `${API_ENDPOINT}/owners`;

export const createOwner = async (userId: number) => {
  const res = await fetch(OWNERS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userId }),
  });
  const owner = res.json();
  return owner;
};
