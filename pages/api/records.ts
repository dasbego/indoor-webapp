// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllRecords } from '../../services/firebase-api'

type Data = {
  records?: string
  message?: string
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    const records = await getAllRecords()
    return res.status(200).json({ records })
  } else {
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
  
}
