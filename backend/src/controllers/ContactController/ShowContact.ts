import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Contact from '../../models/Contact';
import Address from '../../models/Address';

export default {
    async execute(request: Request, response: Response): Promise<Contact[]> {
        try {
            const { id } = request.params;

            const contact = await getRepository(Contact).find({
                where: { id },
            });

            const address = await getRepository(Address).find({
                where: { contact_id: id },
            });

            const data = {
                contact,
                address,
            };

            return response.json(data) && contact;
        } catch (error) {
            response.status(400);
            throw new Error(error.message);
        }
    },
};
