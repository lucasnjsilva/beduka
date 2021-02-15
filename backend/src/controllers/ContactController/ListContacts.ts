import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Contact from '../../models/Contact';

export default {
    async execute(request: Request, response: Response): Promise<Contact[]> {
        try {
            const contact = await getRepository(Contact).find();

            return response.json(contact) && contact;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
