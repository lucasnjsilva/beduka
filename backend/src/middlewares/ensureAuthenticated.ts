import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    try {
        // Token JWT Validation
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new Error('JWT Token is missing.');
        }

        const [, token] = authHeader.split(' ');

        const { secret } = authConfig.jwt;

        const decoded = verify(token, secret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        response.status(401);
        throw new Error(error.message);
    }
}

export default ensureAuthenticated;
