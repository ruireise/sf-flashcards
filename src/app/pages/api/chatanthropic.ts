import type { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from "@anthropic-ai/sdk";

//processes API key
const anthropic = new Anthropic ({
    apiKey: process.env.ANTHROPIC_API_KEY
});

//handles AI message outputs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST'){
        const { message } = req.body;

    try {
        const msg = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            messages: [{ role: "user", content: message }],
        });

        res.status(200).json({ reply: msg.content });
        console.log(msg.content)
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch response from Anthropic' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
}
