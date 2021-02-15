import React, { useState } from 'react';
import api from '../../services/api';

import './style.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const resolve = await api.post('/session', { username, password });

    localStorage.setItem('token', resolve.data.token);
    localStorage.setItem('id', resolve.data.id);
    window.location.href = '/dashboard';
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Faça o login</h1>

        <form>
          <label htmlFor="username">
            Username
            <input
              type="text"
              placeholder="Digite o username: admin"
              onChange={e => setUsername(e.target.value)}
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              placeholder="Digite a senha: admin"
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <button onClick={handleLogin} type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
