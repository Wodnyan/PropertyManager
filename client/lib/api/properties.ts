import { API_ENDPOINT } from "../../constants";

const PROPERTY_ENDPOINT = `${API_ENDPOINT}/properties`;

export const joinProperty = async (
  propertyId: number,
  userId: number,
  inviteCode: string
) => {
  const ENDPOINT = `${PROPERTY_ENDPOINT}/${propertyId}/join`;
  const res = await fetch(`${ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      userId,
      inviteCode,
    }),
  });
  const data = await res.json();
  return data;
};

export const createProperty = async (propertyInfo: any) => {
  const res = await fetch(`${PROPERTY_ENDPOINT}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(propertyInfo),
  });
  const property = await res.json();
  return property;
};
