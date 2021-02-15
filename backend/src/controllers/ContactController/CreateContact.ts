import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Contact from '../../models/Contact';

interface Data {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    birthday: string;
}

export default {
    async execute(request: Request, response: Response): Promise<Contact> {
        try {
            const {
                firstName,
                lastName,
                phone,
                email,
                birthday,
            }: Data = request.body;

            const contactRepository = getRepository(Contact);

            const data = {
                firstName,
                lastName,
                phone,
                email,
                birthday,
            };

            const schema = Yup.object().shape({
                firstName: Yup.string().required(),
                lastName: Yup.string().required(),
                phone: Yup.string().required(),
                email: Yup.string().email().required(),
                birthday: Yup.string().required(),
            });

            await schema.validate(data, { abortEarly: false });

            const contact = contactRepository.create(data);

            await contactRepository.save(contact);

            return response.status(201).json(contact) && contact;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
