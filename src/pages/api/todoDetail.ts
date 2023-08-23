import { NextApiRequest, NextApiResponse } from "next";
import { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const secretKey = process.env.JWT_SECRET_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!secretKey) {
    res.status(401).json({ message: "Unauthorized: Missing JWT secret key" });
    return;
  }
  if (!accessToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const db = await open({
      filename: "./data.db",
      driver: sqlite3.Database,
    });

    if (req.method === "GET") {
      const { id } = req.query;
      if (!id) {
        res.status(400).json({ message: "Missing id parameter" });
        return;
      }
      const todo = await db.get("SELECT * FROM todo WHERE id = ?", id);

      if (!todo) {
        res.status(404).json({ message: "Todo not found" });
      } else {
        res.status(200).json(todo);
      }
    }

    await db.close();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
