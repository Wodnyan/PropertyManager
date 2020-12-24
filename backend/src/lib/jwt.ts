import jwt from "jsonwebtoken";

export const createAccessToken = (id: number) => {
  return jwt.sign(
    {
      //exp: Math.floor(Date.now() / 1000) + 60 * 60,
      exp: 2000,
      data: {
        id,
      },
    },
    process.env.JWT_SECRET!
  );
};

export const createRefreshToken = (id: number) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: {
        id,
      },
    },
    process.env.JWT_SECRET!
  );
};
