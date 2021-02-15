import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Address from '../../models/Address';

export default {
    async execute(request: Request, response: Response): Promise<Address> {
        try {
            const { contact: address_id } = request.params;

            const addressRepository = getRepository(Address);

            const address = await addressRepository.findOne({
                where: { id: address_id },
            });

            if (address) {
                await addressRepository.delete(address_id);
            } else {
                throw new Error('Contact not found');
            }

            return response.status(200).json() && address;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
