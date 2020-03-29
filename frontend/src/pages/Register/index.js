import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import LogoImg from '../../assets/logo.svg';
import api from '../../services/api'

import './style.css';

export default function Register() {

  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ whatsapp, setWhatsapp ] = useState('');
  const [ city, setCity ] = useState('');
  const [ uf, setUF ] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    const data = { 
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    
    try {
      const response = await api.post('ongs', data)
      alert(`Seu ID de acessso é ${response.data.id}`)
      history.push('/')
    } catch (err) {
      alert('Erro, por favor tente novamente.')
    }
  }
  return (
    <div className="content-container">
      <div className="register-container">
        <section className="left-container">
          <img src={LogoImg} alt="Logo"/>
          <h1>Cadastro</h1>
          <p>Faça o seu cadastro, entre na plataforma e ajudem as pessoas a encontrarem os casos de sua ONG</p>
          <Link  to="/" className="linkback"> <FiArrowLeft size={16} color="#E02041" /> Ir para login.</Link>

        </section>

        <div className="inputs-form">
          <form onSubmit={handleRegister}>

            <input
              placeholder="nome da ONG"
              value={name}
              onChange={ e => setName(e.target.value)}
            />

            <input
             type="email"
             placeholder="email"
             value={email}
             onChange={ e => setEmail(e.target.value)}
            />

            <input
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={ e => setWhatsapp(e.target.value)}
            />

              <div className="input-group">
                <input 
                  placeholder="Cidade"
                  value={city}
                  onChange={ e => setCity(e.target.value)}
                />
                <input
                placeholder="UF"
                value={uf}
                onChange={ e => setUF(e.target.value)}
                style={{ width: 80, marginLeft: 8, }}/>
              </div>

            <button className="button" type="submit">Cadastrar</button>

          </form>
        </div>
      </div>
    </div>
  );
}
