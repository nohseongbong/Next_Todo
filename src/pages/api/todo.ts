import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

interface DecodedToken extends JwtPayload {
  userId: string;
}

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
    const decodedToken = jwt.verify(accessToken, secretKey) as DecodedToken;
    const userId = decodedToken.userId;

    // 데이터베이스 연결 설정
    const db = await open({
      filename: "./todo.db",
      driver: sqlite3.Database,
    });

    await db.run(`
  CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    title TEXT,
    content TEXT,
    completed BOOLEAN
  )
`);

    if (req.method === "GET") {
      // SELECT 쿼리 실행
      const todos = await db.all("SELECT * FROM todo");
      res.status(200).json(todos);
    }

    if (req.method === "POST") {
      const { title, content } = req.body;
      // INSERT 쿼리 실행
      await db.run("INSERT INTO todo (userId, title, content, completed) VALUES (?, ?, ?, ?)", userId, title, content, false);
      res.status(201).json({ message: "Todo created successfully" });
    }

    if (req.method === "PUT") {
      const { id, title, content, completed } = req.body;
      // UPDATE 쿼리 실행
      await db.run("UPDATE todo SET title = ?, content = ?, completed = ? WHERE id = ?", title, content, completed, id);
      res.status(201).json({ message: "Todo updated successfully" });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      // DELETE 쿼리 실행
      await db.run("DELETE FROM todo WHERE id = ? AND userId = ?", id, userId);
      res.status(201).json({ message: "Todo deleted successfully" });
    }

    // 데이터베이스 연결 종료
    await db.close();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
