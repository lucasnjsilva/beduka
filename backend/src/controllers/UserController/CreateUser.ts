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
            const { username, password }: Data = request.body;
            const userRepository = getRepository(User);

            const schema = Yup.object().shape({
                username: Yup.string().required(),
                password: Yup.string().required(),
            });

            await schema.validate(request.body, { abortEarly: false });

            // to encrypt password
            const hashedPassword = await hash(password, 8);

            const user = userRepository.create({
                username,
                password: hashedPassword,
            });

            await userRepository.save(user);

            const finalUser = await userRepository.findOne({
                where: { username },
            });

            return response.status(200).json(finalUser) && user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
