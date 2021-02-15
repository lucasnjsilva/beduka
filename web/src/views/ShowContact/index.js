import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { config } from '../../utils/auth';
import './style.css';

import noProfile from '../../images/no-profile.jpg';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const ShowContact = (props) => {
    const [contact, setContact] = useState({});
    const [address, setAddress] = useState({});
    const id = props.match.params.id;
    const getFiles = 'http://localhost:3333'

    useEffect(() => {
        if(contact.id === undefined) {
            api.get(`/${id}`, config).then(response => {
                const { data: { contact = [] } = {} } = response;
                setContact(contact[0] || {});

                const { data: { address = [] } = {} } = response;
                setAddress(address[0] || {});
            });

        } else {
            return;
        }
    }, [contact.id, contact.birthday, id]);

    // console.log(new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(birthday));

    return (
        <>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <div className="voltar">
                            <Link to="/"> Voltar </Link>
                        </div>

                        <div className="circle">
                            <img
                                className="foto-perfil img-responsive"
                                src={contact.avatar ? `${getFiles}/files/${contact.avatar}` : noProfile}
                                alt="Foto do Perfil"
                            />
                        </div>


                    </Col>
                </Row>

                <hr/>

                <Row>
                    <Col className="col-6">
                        <ul className="lista-contato">
                            <li>
                                <b>Nome: </b> {contact.firstName} {contact.lastName}
                            </li>
                            <li>
                                <b>Data de Nascimento: </b> {contact.birthday}
                            </li>
                            <li>
                                <b>Telefone: </b> {contact.phone}
                            </li>
                            <li>
                                <b>Email: </b> {contact.email}
                            </li>
                        </ul>
                    </Col>

                    <Col className="col-6">
                        <ul className="lista-endereco">
                            <li>
                                <b>Rua: </b> {address.street}
                            </li>
                            <li>
                                <b>Número: </b> {address.number}
                            </li>
                            <li>
                                <b>Bairro: </b> {address.district}
                            </li>
                            <li>
                                <b>Cidade: </b> {address.city}
                            </li>
                            <li>
                                <b>Estado: </b> {address.state}
                            </li>
                        </ul>
                    </Col>
                </Row>

                <Col className="d-flex justify-content-center">
                    <div className="buttons">
                        <Link to={`/editar/${id}`} className="editar"> Editar </Link>
                        <Link to={`/deletar/${id}`} className="deletar"> Deletar </Link>
                    </div>
                </Col>

            </Container>
        </>
    );
}

export default ShowContact;
