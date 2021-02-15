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
            const { id: contact_id } = request.params;
            const {
                firstName,
                lastName,
                email,
                phone,
                birthday,
            }: Data = request.body;

            const contactRepository = getRepository(Contact);

            const data = {
                firstName,
                lastName,
                email,
                phone,
                birthday,
            };

            const contact = await contactRepository.findOne({
                where: { id: contact_id },
            });

            const contactNotFound = !contact;
            if (contactNotFound) {
                response.status(400);
                throw new Error('Contact not found');
            }

            const schema = Yup.object().shape({
                firstName: Yup.string().required(),
                lastName: Yup.string().required(),
                phone: Yup.string().required(),
                email: Yup.string().email().required(),
                birthday: Yup.string().required(),
            });

            await schema.validate(data, { abortEarly: false });

            const update = await contactRepository.update(contact_id, data);

            if (update.affected !== 1) {
                throw new Error('Unable update.');
            }

            const contactUpdated = await contactRepository.findOneOrFail({
                where: { id: contact_id },
            });

            return response.json(contactUpdated).status(200) && contactUpdated;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
