import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from 'next-http-proxy-middleware';

export default (req: NextApiRequest, res: NextApiResponse) => (
    httpProxyMiddleware(req, res, {
        target: process.env.NEXT_PUBLIC_HOST
    })
);