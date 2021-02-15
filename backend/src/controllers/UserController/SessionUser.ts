import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../../models/User';

interface SessionResponse {
    user: User;
    token: string;
}

export default {
    async execute(
        request: Request,
        response: Response,
    ): Promise<SessionResponse> {
        try {
            const { username, password } = request.body;

            const userRepository = getRepository(User);

            const user = await userRepository.findOne({ where: { username } });

            if (!user) {
                throw new Error('User not found.');
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new Error('Username or password incorrect.');
            }

            const { secret, expiresIn } = authConfig.jwt;

            const token = sign({}, secret, {
                subject: user.id,
                expiresIn,
            });

            const userData = {
                id: user.id,
                username: user.username,
                password: user.password,
                created_at: user.created_at,
                updated_at: user.updated_at,
                token,
            };

            return response.status(200).json(userData) && { user, token };
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
