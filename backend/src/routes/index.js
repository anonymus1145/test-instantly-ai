import {GoogleGenAI} from '@google/genai';
import dotenv from "dotenv";
dotenv.config();


export default async function routes(fastify, options) {

  fastify.get('/ping', async (request, reply) => {
    return 'pong\n';
  });

  fastify.post('/send-email', async (request, reply) => {
    const { to, cc, bcc, subject, body } = request.body;

    // Basic validation
    if (!to || !subject || !body) {
      return reply.status(400).send({ error: "Missing required fields" });
    }

    // For now just log, later hook up to Nodemailer or other service
    fastify.log.info("📩 New email request:", { to, cc, bcc, subject, body });

    return { status: "ok", message: "Email received", data: { to, cc, bcc, subject, body } };
  });


  fastify.get("/event", async (req, res) => {

  const GEMINI_API_KEY = process.env.API_KEY;
  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
    let promptSubject;
    let promptBody;

   const question = req.query.prompt;
   if (!question) {
     return res.status(400).send("No prompt in the request");
   }

    
    let prompt = ` Given the user question ${question}, classify it as either being about \`Sales Assistant\` or \` Follow-up Assistant\`.

   **Instructions:**
   Do not respond with more than two words.`;

    const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: prompt,
  });

   if (response.text.trim().toLowerCase().includes("sales")) {
     promptSubject = 'Generates only one subject for a sale email, tailored to the recipient business description.';

    promptBody = `Generate only one body for a sale email, tailored to the recipient business description. 

   **Instructions:**
   #Keep the email under 40 words total. So it can be read under 10 seconds., max 7-10 words/sentence.
   #Add an salute and the provided name at the end.
   #Generate only the body.
`;

   } else if (response.text.trim().toLowerCase().includes("follow-up")) {
      promptSubject = 'Generate only one subject of an polite follow-up email';

     promptBody = `Generate only one body of a polite follow-up email (e.g., “just checking in)”

   **Instructions:**
   #Keep the email under 40 words total. So it can be read under 10 seconds., max 7-10 words/sentence.
   #Add an salute and the provided name at the end.
   #Generate only the body.
`;
   }
  const subjectResponse = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash-001',
    contents: promptSubject,
  });

    for await (const chunk of subjectResponse) {
    res.sse({ data: JSON.stringify({ subject: chunk.text }) });
  }

    const bodyResponse = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash-001',
    contents: promptBody,
  });

    for await (const chunk of bodyResponse) {
    res.sse({ data: JSON.stringify({ body: chunk.text }) });
}});
}
