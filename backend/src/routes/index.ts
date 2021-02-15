import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import SessionUser from '../controllers/UserController/SessionUser';

import CreateUser from '../controllers/UserController/CreateUser';
import UpdateUser from '../controllers/UserController/UpdateUser';
import ShowUser from '../controllers/UserController/ShowUser';
import DeleteUser from '../controllers/UserController/DeleteUser';

import CreateContact from '../controllers/ContactController/CreateContact';
import UpdateContact from '../controllers/ContactController/UpdateContact';
import AddAvatarToContact from '../controllers/ContactController/AddAvatarToContact';
import ListContact from '../controllers/ContactController/ListContacts';
import ShowContact from '../controllers/ContactController/ShowContact';
import DeleteContact from '../controllers/ContactController/DeleteContact';

import CreateAddress from '../controllers/AddressController/CreateAddress';
import UpdateAddress from '../controllers/AddressController/UpdateAddress';
import ShowAddress from '../controllers/AddressController/ShowAddress';
import DeleteAddress from '../controllers/AddressController/DeleteAddress';

const router = Router();
const upload = multer(uploadConfig);

/* Session */
router.post('/session', SessionUser.execute);

/* User */
router.post('/user', CreateUser.execute);
router.put('/user/:id', ensureAuthenticated, UpdateUser.execute);
router.get('/user/:id', ensureAuthenticated, ShowUser.execute);
router.delete('/user/:id', ensureAuthenticated, DeleteUser.execute);

/* Contact */
router.post('/', ensureAuthenticated, CreateContact.execute);
router.put('/:id', ensureAuthenticated, UpdateContact.execute);
router.get('/', ensureAuthenticated, ListContact.execute);
router.get('/:id', ensureAuthenticated, ShowContact.execute);
router.delete('/:id', ensureAuthenticated, DeleteContact.execute);
router.patch('/avatar/:contact', upload.single('avatar'), AddAvatarToContact.execute); //eslint-disable-line

/* Address */
router.post('/:contact', ensureAuthenticated, CreateAddress.execute);
router.put('/address/:id', ensureAuthenticated, UpdateAddress.execute);
router.get('/address/:id', ensureAuthenticated, ShowAddress.execute);
router.delete('/address/:contact', ensureAuthenticated, DeleteAddress.execute);

export default router;
