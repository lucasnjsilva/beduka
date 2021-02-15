import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Address from '../../models/Address';

export default {
    async execute(request: Request, response: Response): Promise<Address[]> {
        try {
            const { id } = request.params;
            const address = await getRepository(Address).find({
                where: { id },
            });

            return response.json(address) && address;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
