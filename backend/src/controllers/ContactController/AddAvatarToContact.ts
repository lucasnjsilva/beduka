/* eslint-disable no-console */

import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';
import uploadConfig from '../../config/upload';

import Contact from '../../models/Contact';

export default {
    async execute(request: Request, response: Response): Promise<Contact> {
        try {
            const { contact: contact_id } = request.params;
            const avatarFilename = request.file.filename;

            const contactRepository = getRepository(Contact);

            const contact = await contactRepository.findOne(contact_id);

            if (!contact) {
                throw new Error('Contact not found');
            }

            if (contact.avatar) {
                // Deletar avatar anterior
                const contactAvatarFilePath = path.join(
                    uploadConfig.directory,
                    contact.avatar,
                );

                const contactAvatarFileExists = await fs.promises.stat(
                    contactAvatarFilePath,
                );

                if (contactAvatarFileExists) {
                    await fs.promises.unlink(contactAvatarFilePath);
                }
            }

            contact.avatar = avatarFilename;

            await contactRepository.save(contact);

            const data = {
                id: contact.id,
                firstName: contact.firstName,
                lastName: contact.lastName,
                phone: contact.phone,
                email: contact.email,
                birthday: contact.birthday,
                avatar: contact.avatar,
                created_at: contact.created_at,
                updated_at: contact.updated_at,
            };

            return response.json(data) && contact;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    },
};
