import React, { useState } from 'react';
import './style.css';
import api from '../../services/api';
import { config } from '../../utils/auth';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const CreateContact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const contact = {
        firstName,
        lastName,
        birthday,
        phone,
        email,
    }

    const handleAddMoreInformations = async () => {
        api.post('/', contact, config).then((response) => {
            return window.location.href = `/editar/${response.data.id}`;
        }).catch(() => {
            return window.location.href = '/';
        });
    }

    const handleCreatedContact = async () => {
        try {
            await api.post('/', contact, config);
            return window.location.href = '/';
        } catch (error) {
            return window.location.href = '/' && alert("Erro ao adicionar um contato.");
        }
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

                <hr />

                <Row>
                    <Col className="col criar-contato">
                        <h3 className="title">Cadastrar um novo Contato</h3>
                        <ul className="contato">
                            <li>
                                <label>Primeiro Nome: </label>
                                <input id="firstName" type="text" required onChange={
                                    (e) => (setFirstName(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Sobrenome: </label>
                                <input id="lastName" type="text" required onChange={
                                    (e) => (setLastName(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Birdthday: </label>
                                <input id="birthday" type="text" required onChange={
                                    (e) => (setBirthday(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Telefone: </label>
                                <input id="phone" type="text" required onChange={
                                    (e) => (setPhone(e.target.value))
                                }/>
                            </li>
                            <li>
                                <label>Email: </label>
                                <input id="email" type="text" required onChange={
                                    (e) => (setEmail(e.target.value))
                                }/>
                            </li>
                        </ul>
                    </Col>
                </Row>

                <Col className="d-flex justify-content-center mt-3">
                    <Link to="/" onClick={handleCreatedContact} className="salvar"> Cadastrar </Link>
                    <Link to="#" onClick={handleAddMoreInformations} className="next"> Adicionar mais informações </Link>
                </Col>

            </Container>
        </>
    );
}

export default CreateContact;
