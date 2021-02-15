import React, { useState, useEffect } from 'react';
import './style.css';
import api from '../../services/api';
import { config } from '../../utils/auth';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const UpdateContact = (props) => {
    const [contact, setContact] = useState({});
    const [address, setAddress] = useState({});
    const id = props.match.params.id;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [addressId, setAddressId] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [avatar, setAvatar] = useState({});

    useEffect(() => {
        if(contact.id === undefined) {
            api.get(`/${id}`, config).then(response => {
                const { data: { contact = [] } = {} } = response;
                setContact(contact[0] || {});

                const { data: { address = [] } = {} } = response;
                setAddress(address[0] || {});
            });
        }

        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setBirthday(contact.birthday);
        setPhone(contact.phone);
        setEmail(contact.email);
        setAddressId(address.id);
        setStreet(address.street);
        setNumber(address.number);
        setDistrict(address.district);
        setCity(address.city);
        setState(address.state);
        setAvatar(undefined);

        if(contact.id) return;
    }, [contact, address, id]);

    const handleChange = (event) => {
        setAvatar(event.target.files[0]);
    }

    // Atualizar dados
    const handleUpdate = async () => {
        await api.put(`/${id}`, {
            firstName,
            lastName,
            email,
            phone,
            birthday,
        }, config);

        const addressData = {
            street,
            number,
            district,
            city,
            state,
        }

        // Endereço
        if (addressId === undefined) {
            api.post(`/${id}`, addressData, config).then(() => {
                return;
            });
        } else {
            api.put(`/address/${addressId}`, addressData, config).then(() => {
                return;
            });
        }

        // Avatar
        if (avatar !== undefined) {
            const formData = new FormData();
            formData.append('avatar', avatar);
            formData.append('_method', 'PATCH');

            await api.patch(`/avatar/${id}`, formData, {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                }
            });
        }

        return window.location.href = `/detalhe/${id}`;
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <div className="voltar">
                            <Link to="/"> Voltar </Link>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col className="col-6">
                        <ul className="lista-contato">
                            <li>
                                <label>Primeiro Nome: </label>
                                <input type="text" id="name" defaultValue={contact.firstName} onChange={
                                    (e) => (setFirstName(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Sobrenome: </label>
                                <input type="text" id="lastName" defaultValue={contact.lastName} onChange={
                                    (e) => (setLastName(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Data de Nascimento: </label>
                                <input type="text" id="birthday" defaultValue={contact.birthday} onChange={
                                    (e) => (setBirthday(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Telefone: </label>
                                <input type="text" id="phone" defaultValue={contact.phone} onChange={
                                    (e) => (setPhone(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Email: </label>
                                <input type="text" id="email" defaultValue={contact.email} onChange={
                                    (e) => (setEmail(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Foto de Perfil: </label>
                                <input id="file" type="file" onChange={handleChange} />
                            </li>

                        </ul>
                    </Col>

                    <Col className="col-6">
                        <ul className="lista-endereco">
                            <li>
                                <label>Rua: </label>
                                <input type="text" id="street" defaultValue={address.street} onChange={
                                    (e) => (setStreet(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Número: </label>
                                <input type="text" id="number" defaultValue={address.number} onChange={
                                    (e) => (setNumber(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Bairro: </label>
                                <input type="text" id="district" defaultValue={address.district} onChange={
                                    (e) => (setDistrict(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Cidade: </label>
                                <input type="text" id="city" defaultValue={address.city} onChange={
                                    (e) => (setCity(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Estado: </label>
                                <input type="text" id="state" defaultValue={address.state} onChange={
                                    (e) => (setState(e.target.value))
                                }/>
                            </li>
                        </ul>
                    </Col>
                </Row>

                <Col className="d-flex justify-content-center">
                    <Link onClick={handleUpdate} className="salvar"> Salvar </Link>
                </Col>

            </Container>
        </>
    );
}

export default UpdateContact;
