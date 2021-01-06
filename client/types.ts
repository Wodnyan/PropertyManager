export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Property {
  ownerId: number | null;
  name: string;
  address: string | undefined;
  longitude: number | undefined;
  latitude: number | undefined;
}
