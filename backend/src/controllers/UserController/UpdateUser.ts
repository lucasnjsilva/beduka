import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import User from '../../models/User';

interface Data {
    username: string;
    password: string;
}

export default {
    async execute(request: Request, response: Response): Promise<User> {
        try {
            const { id } = request.params;
            const { username, password }: Data = request.body;

            const userRepository = getRepository(User);

            const user = userRepository.findOne({
                where: { id },
            });

            const userNotFound = !user;

            if (userNotFound) {
                throw new Error('User not found.');
            }

            const schema = Yup.object().shape({
                username: Yup.string().required(),
                password: Yup.string().required(),
            });

            await schema.validate(request.body, { abortEarly: false });

            // to encrypt password
            const hashedPassword = await hash(password, 8);

            const update = await userRepository.update(id, {
                username,
                password: hashedPassword,
            });

            if (update.affected !== 1) {
                throw new Error('Unable update.');
            }

            const userUpdated = await userRepository.findOneOrFail({
                where: { id },
            });

            return response.status(200).json(userUpdated) && userUpdated;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
