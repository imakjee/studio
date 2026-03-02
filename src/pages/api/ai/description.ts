import type { NextApiRequest, NextApiResponse } from 'next';
import { generateHolidayDescription } from '@/ai/flows/holiday-description-generator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const result = await generateHolidayDescription(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Holiday Description API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
