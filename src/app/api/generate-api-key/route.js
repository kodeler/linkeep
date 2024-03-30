// pages/api/keys/create.js
import { getSession } from "next-auth/react";
import clientPromise from "../../../libs/mongoClient";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "No autenticado" });
  }

  const client = await clientPromise;
  const db = client.db("test");

  // Genera una nueva clave API
  const newApiKey = `api_${Math.random().toString(36).substr(2, 9)}`;

  // Añade la nueva clave al usuario en la base de datos
  await db.collection("users").updateOne(
    { email: session.user.email },
    { $push: { apiKeys: newApiKey } }
  );

  res.status(200).json({ apiKey: newApiKey });
}
