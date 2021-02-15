import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

// import Authentication from '../config/Authentication';
import Contact from '../../models/Contact';
import Address from '../../models/Address';

interface Data {
    street: string;
    number: number;
    district: string;
    city: string;
    state: string;
    contact_id: string;
}

export default {
    async execute(request: Request, response: Response): Promise<Address> {
        try {
            const { contact: contact_id } = request.params;
            const { street, number, district, city, state } = request.body;

            const addressRepository = getRepository(Address);

            // Check if the contact id has exist in Address table
            const findContact = await addressRepository.findOne({
                where: { contact_id },
            });

            if (findContact) {
                response.status(400);
                throw new Error('The contact address already exists');
            }

            // All data to register
            const data: Data = {
                street,
                number,
                district,
                city,
                state,
                contact_id,
            };

            // Validation
            const schema = Yup.object().shape({
                street: Yup.string().required(),
                number: Yup.number().required(),
                district: Yup.string().required(),
                city: Yup.string().required(),
                state: Yup.string().required(),
            });

            await schema.validate(data, { abortEarly: false });

            // Verifica se existe um contato com aquele ID
            const contactRepository = getRepository(Contact).findOne({
                where: { id: contact_id },
            });

            const contactNotFound = !contactRepository;

            if (contactNotFound) {
                throw new Error('Contact not found');
            }

            const address = addressRepository.create(data);

            await addressRepository.save(address);

            return response.status(201).json(address) && address;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
