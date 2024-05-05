import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

/**
 * The health endpoint.
 * @param {NextApiRequest} _req The request.
 * @param {NextApiResponse} res The response.
 */
const handler: NextApiHandler = async (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: 'healthy' });
};

export default handler;
