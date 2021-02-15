import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../../models/User';

export default {
    async execute(request: Request, response: Response): Promise<User> {
        try {
            const { id } = request.params;

            const userRepository = getRepository(User);

            const userExist = await userRepository.findOne({
                where: { id },
            });

            if (userExist) {
                await userRepository.delete(id);
            } else {
                throw new Error('User not found.');
            }

            return response.status(200).json() && userExist;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
