import type { NextApiRequest, NextApiResponse } from 'next';
import { generateHeadline } from '@/ai/flows/ai-enhanced-headline-generation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const result = await generateHeadline(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Headline API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
