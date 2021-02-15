import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Address from '../../models/Address';

interface Data {
    street: string;
    number: number;
    district: string;
    city: string;
    state: string;
}

export default {
    async execute(request: Request, response: Response): Promise<Address> {
        try {
            const { id } = request.params;
            const { street, number, district, city, state } = request.body;

            const addressRepository = getRepository(Address);

            const data: Data = {
                street,
                number,
                district,
                city,
                state,
            };

            const address = await addressRepository.findOne({
                where: { id },
            });

            const addressNotFound = !address;

            if (addressNotFound) {
                response.status(400);
                throw new Error('Address not found');
            }

            const schema = Yup.object().shape({
                street: Yup.string(),
                number: Yup.number(),
                district: Yup.string(),
                city: Yup.string(),
                state: Yup.string(),
            });

            await schema.validate(data, { abortEarly: false });

            const update = await addressRepository.update(id, data);

            if (update.affected !== 1) {
                response.status(400);
                throw new Error('Unable to update');
            }

            const updatedAddress = await addressRepository.findOneOrFail({
                where: { id },
            });

            return response.json(updatedAddress).status(200) && updatedAddress;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
