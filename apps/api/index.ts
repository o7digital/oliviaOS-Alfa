import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/api/mail/ingest", async (req, res) => {
  const { subject, from, to, body, organizationId } = req.body;

  const thread = await prisma.thread.create({
    data: {
      subject,
      organizationId,
    },
  });

  await prisma.message.create({
    data: {
      threadId: thread.id,
      from,
      to,
      body,
    },
  });

  res.json({ success: true });
});

app.listen(3001, () => {
  console.log("API running on port 3001");
});
