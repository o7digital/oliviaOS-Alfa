import Imap from "imap";
import { simpleParser } from "mailparser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const imap = new Imap({
  user: process.env.IMAP_USER!,
  password: process.env.IMAP_PASS!,
  host: process.env.IMAP_HOST!,
  port: 993,
  tls: true,
});

function openInbox(cb: any) {
  imap.openBox("INBOX", false, cb);
}

imap.once("ready", function () {
  openInbox(function (err: any) {
    if (err) throw err;

    imap.search(["UNSEEN"], function (err: any, results: any) {
      if (!results || !results.length) return;

      const f = imap.fetch(results, { bodies: "" });

      f.on("message", function (msg: any) {
        msg.on("body", function (stream: any) {
          simpleParser(stream, async (err, parsed) => {
            await axios.post("http://localhost:3001/api/mail/ingest", {
              subject: parsed?.subject,
              from: parsed?.from?.text,
              to: parsed?.to?.text,
              body: parsed?.text,
              organizationId: process.env.ORG_ID,
            });
          });
        });
      });
    });
  });
});

imap.connect();
