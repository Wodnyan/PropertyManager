import { API_ENDPOINT } from "../../constants";

const OWNERS_ENDPOINT = `${API_ENDPOINT}/owners`;

export const createOwner = async (userId: number, accessToken: string) => {
  const res = await fetch(OWNERS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify({ userId }),
  });
  const data = await res.json();
  if (res.status !== 201) {
    throw data;
  }
  return data;
};
