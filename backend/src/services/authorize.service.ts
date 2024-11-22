import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { generateHtmlResponse } from './html.service';
import { Pool } from 'pg';

export interface DecodedToken {
  memoryId: string;
}

/**
 * Checks for JWT authorization in a approve/reject request.
 * Also Checks if the approve/reject request was already handled.
 * @param req The approve/reject request.
 * @param res The reponse.
 * @param SECRET_KEY Secret key used to sign the JWT request.
 * @param pool PostgreSQL pool of memories and pending memories.
 * @returns null if authorization failed, the memory ID of the approve/reject request (for further handling) otherwise.
 */
export async function checkAuthorization(
    req: Request, 
    res: Response, 
    SECRET_KEY: string | undefined,
    pool: Pool
) : Promise<string | null> {
  const { id } = req.params;
  const token = req.query.token as string | undefined;

  if (!token) {
    res.status(400).send(generateHtmlResponse('Bad Request', 'Missing or invalid token.', false));
    return null;
  }

  if (!SECRET_KEY) {
    res.status(500).send(generateHtmlResponse('Server Error', 'Missing secret key.', false));
    return null;
  }

  try {
    console.log("Checking autorization using secret key of " + SECRET_KEY)
    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;
    console.log("Decoded:", decoded);

    // Check if the token is valid and contains memoryId
    if (typeof decoded === 'string' || !decoded.memoryId) {
      res.status(401).send(generateHtmlResponse('Unauthorized', 'Invalid token.', false));
      return null;
    }

    const memoryId = decoded.memoryId;

    // Check if the pending memory was already handled
    const checkQuery = 'SELECT id FROM pending_memories WHERE id = $1';
    const result = await pool.query(checkQuery, [memoryId]);

    if (result.rows.length === 0) {
        res.status(400).send(generateHtmlResponse('Request Already Handled', 'This request has already been approved or rejected.', false));
        return null;
      }

    // Check if the memoryId from the token matches the id in the route
    if (id !== memoryId) {
      res.status(401).send(generateHtmlResponse('Unauthorized', 'Invalid memory ID.', false));
      return null;
    }

    return memoryId; // Return memoryId if authorization is successful
  } catch (err) {
    res.status(401).send(generateHtmlResponse('Unauthorized', 'Invalid or expired token.', false));
    return null;
  }
}