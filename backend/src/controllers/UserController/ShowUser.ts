import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../../models/User';

export default {
    async execute(request: Request, response: Response): Promise<User[]> {
        try {
            const { id } = request.params;

            const user = await getRepository(User).find({
                where: { id },
            });

            return response.json(user) && user;
        } catch (error) {
            response.status(400);
            throw new Error(error.message);
        }
    },
};
