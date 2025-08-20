import { GoogleGenerativeAI } from "@google/generative-ai";
import fastifySse from "fastify-sse";
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


  fastify.get("/events", async (request, reply) => {

    /*
   const key = process.env.API_KEY || '';
   const genAI = new GoogleGenerativeAI(key);
   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

   const question = request.body.aiPrompt;
   if (!question) {
     return reply.status(400).send("No prompt in the request");
   }

   // Helper function to stream chunks
   const streamChunks = async (promptText) => {
     let result = '';
     const stream = model.streamContent({ contents: [{ role: "user", parts: [{ text: promptText }] }] });

     for await (const chunk of stream) {
       const text = chunk.response?.text?.() || '';
       if (text) {
         result += text;
         // Write partial chunk to client
         reply.raw.write(text);
       }
     }
   };

   let prompt = ` Given the user question ${question}, classify it as either being about \`Sales Assistant\` or \` Follow-up Assistant\`.

   **Instructions:**
   Do not respond with more than two words.`;

   const response = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
   const formatedResponse = response.response.text().trim();

   if (formatedResponse.toLowerCase().includes("sales")) {
     prompt = `Generates sales emails, tailored to the recipient business description. 

   **Instructions:**
   #Keep the email under 40 words total. So it can be read under 10 seconds., max 7-10 words/sentence.
   #Only generate the subject and the body of the email.
   #Add an salute and the provided name at the end.
`;

   } else if (formatedResponse.toLowerCase().includes("follow-up")) {
     prompt = `Generate polite follow-up email (e.g., “just checking in)”

   **Instructions:**
   #Keep the email under 40 words total. So it can be read under 10 seconds., max 7-10 words/sentence.
   #Only generate the subject and the body of the email.
   #Add an salute and the provided name at the end.
`;

   }
   await streamChunks(assistantPrompt);

   reply.raw.end(); // finish streaming
   */
  });
}
