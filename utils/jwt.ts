import jwt from "jsonwebtoken";

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No seed for JWT");
  }

  return jwt.sign(
    {
      _id,
      email,
    },
    process.env.JWT_SECRET_SEED,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No JWT seed");
  }

  if (token.length <= 10) {
    return Promise.reject("Invalid token");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || "", (err, payload) => {
        if (err) return reject("Invalid token");

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      reject("Invalid token");
    }
  });
};
