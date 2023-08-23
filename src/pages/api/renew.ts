import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface DecodedToken extends JwtPayload {
  userId: string;
}

const secretKey = process.env.JWT_SECRET_KEY;

type ResponseType = {
  accessToken: string;
};

type RequestData = {
  accessToken: string;
  refreshToken: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType | { message: string }>) {
  if (req.method === "POST") {
    /**
     * @param accessToken access 토큰
     * @param refreshToken refresh 토큰
     */
    const { accessToken, refreshToken } = req.body as RequestData;
    if (!refreshToken || !accessToken) {
      res.status(400).json({ message: "Refresh token is required" });
      return;
    }

    if (!secretKey) {
      res.status(401).json({ message: "Unauthorized: Missing JWT secret key" });
      return;
    }

    try {
      const decodedToken = jwt.verify(refreshToken, secretKey) as DecodedToken;
      const userId = decodedToken.userId;

      const newAccessToken = jwt.sign({ userId }, secretKey, { expiresIn: "1m" });

      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  } else {
    res.status(405).end();
  }
}
