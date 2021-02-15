import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../../config/upload';

import Contact from '../../models/Contact';

export default {
    async execute(request: Request, response: Response): Promise<Contact> {
        try {
            const { id: contact_id } = request.params;

            const contactRepository = getRepository(Contact);

            const contact = await contactRepository.findOne({
                where: { id: contact_id },
            });

            if (contact) {
                await contactRepository.delete(contact_id);

                if (contact.avatar) {
                    // To delete previous avatar
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
            } else {
                throw new Error('Contact not found');
            }

            /*             response.writeHead(301, {
                Location: '/',
            }); */

            return response.status(200).json() && contact;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
