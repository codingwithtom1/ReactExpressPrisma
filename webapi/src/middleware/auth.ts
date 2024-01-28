import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

dotenv.config();
//const key = process.env.SECRETKEY || 'nokey';
const publickey = fs.readFileSync('public.pem');

export interface AuthRequest extends Request {
  user: {
    userId: string,
    email: string,
    firstname: string,
    lastname: string
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, publickey) as { userId: string, email: string, firstname: string, lastname: string };
    (req as AuthRequest).user = {
      email: decoded.email,
      userId: decoded.userId,
      firstname: decoded.firstname,
      lastname: decoded.lastname
    };
    next();
  } catch (err) {
    
    res.clearCookie('token');
    res.status(401).send('Please authenticate');
  }
};