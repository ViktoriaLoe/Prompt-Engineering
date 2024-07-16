import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { promptName, text, instructions } = req.body;
  const response = {
    result: 'Your result here',
    tokens: {
      total_tokens: 100,
      prompt_tokens: 50,
      completion_tokens: 50,
    },
  };
  res.status(200).json(response);
}
