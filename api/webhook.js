// api/webhook.js
export default async function handler(req, res) {
  // 1. Handle Meta Webhook Verification (GET Request)
  if (req.method === "GET") {
    const VERIFY_TOKEN = "my_secret_token_123"; // Make sure this matches Meta exactly!

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token) {
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WEBHOOK_VERIFIED SUCCESSFULLY");
        
        // CRITICAL FIX: Meta requires raw text, NOT a JSON string or quoted text
        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(challenge);
      } else {
        return res.status(403).send("Token mismatch");
      }
    }
    return res.status(400).send("Missing parameters");
  }

  // 2. Handle Incoming WhatsApp Messages (POST Request)
  if (req.method === "POST") {
    return res.status(200).send("EVENT_RECEIVED");
  }

  return res.status(405).send("Method not allowed");
}
