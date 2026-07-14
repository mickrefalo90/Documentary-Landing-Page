import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      if (!spreadsheetId) {
        throw new Error("GOOGLE_SHEET_ID is not configured");
      }

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet1!A:D",
        valueInputOption: "RAW",
        requestBody: {
          values: [[new Date().toISOString(), name, email, message || ""]],
        },
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error appending to Google Sheet:", error);
      res.status(500).json({ error: "Failed to save contact information" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
    app.get("*", async (req, res) => {
      try {
        const indexPath = path.join(distPath, "index.html");
        let html = await fs.readFile(indexPath, "utf-8");
        
        // Dynamically replace the default domain with the current request origin to ensure preview URLs display cards perfectly
        const host = req.headers.host || "regionlocked-doco.com";
        // Force secure https protocol for all non-local preview or production requests to satisfy security-conscious scrapers
        const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
        const protocol = isLocal ? "http" : "https";
        const currentOrigin = `${protocol}://${host}`;
        
        // Replace all instances of the base URL with the current domain and protocol
        html = html.replaceAll("https://regionlocked-doco.com", currentOrigin);
        
        // Dynamically rewrite the og:url to match the exact requested path for failsafe sharing on Slack, iMessage, Messenger, etc.
        const fullRequestedUrl = `${currentOrigin}${req.originalUrl}`;
        html = html.replace(
          /<meta property="og:url" content="[^"]*" \/>/g,
          `<meta property="og:url" content="${fullRequestedUrl}" />`
        );
        
        res.setHeader("Content-Type", "text/html");
        res.send(html);
      } catch (err) {
        console.error("Error serving index.html dynamically:", err);
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
