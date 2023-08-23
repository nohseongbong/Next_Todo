import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

type ResponseType = {
  accessToken: string;
  refreshToken: string;
};

type RequestData = {
  email: string;
  password: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType | { message: string }>) {
  if (req.method === "POST") {
    /**
     * @param email 이메일
     * @param password 비밀번호
     */
    const { email, password } = req.body as RequestData;

    if (!secretKey) {
      res.status(401).json({ message: "Unauthorized: Missing JWT secret key" });
      return;
    }

    try {
      if (email !== EMAIL || password !== PASSWORD) {
        res.status(401).json({ message: "Authentication failed" });
        return;
      }

      const accessToken = jwt.sign({ userId: 1 }, secretKey, { expiresIn: "10m" });
      const refreshToken = jwt.sign({ userId: 1, tokenType: "refresh" }, secretKey, { expiresIn: "7d" });

      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
