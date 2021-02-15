import React, { useEffect, useState } from 'react';
import './style.css';
import api from '../../services/api';
import { config } from '../../utils/auth';
import noProfile from '../../images/no-profile.jpg';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function Home() {
    const [ contacts, setContacts ] = useState([]);
    const getFiles = 'http://localhost:3333'

    useEffect(() => {
        api.get('/', config).then(response => {
            setContacts(response.data);
        });
    }, []);

    return (
        <Container>
            <Row>
                <Link to="/cadastrar" className="cadastrar">
                    Cadastrar
                </Link>
                <Link to="/logout" className="sair">
                    Sair
                </Link>
            </Row>

            <hr/>

            <Row>
                <Col>
                    <ul className="lista-contatos">
                        {
                            contacts.map(contact => (
                                <li key={contact.id} className="lista">
                                    <Link to={`/detalhe/${contact.id}`} className="contato">
                                        <img
                                            className="foto-perfil"
                                            src={contact.avatar ? `${getFiles}/files/${contact.avatar}` : noProfile}
                                            alt="Foto do Perfil"
                                        />
                                        <p>{contact.firstName}</p>
                                        <Link to={`/editar/${contact.id}`} className="editar"> Editar </Link>
                                        <Link to={`/deletar/${contact.id}`} className="deletar"> Deletar </Link>
                                    </Link>
                                    <hr />
                                </li>
                            ))
                        }
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
