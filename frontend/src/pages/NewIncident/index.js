import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import LogoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './style.css';

export default function NewIncident() {

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');


  async function handleNewIncidents(e){
    e.preventDefault();

    console.log({title, description, value})

    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('incidents', data, {
      headers: {
        Authorization: ongId
      }})
      history.push('/profile')

    } catch (err) {

      alert('Erro ao postar o incident')
      
    }
  }

  return (
    <div className="content-container">
      <div className="new-incident-container">
        <section className="left-container">
          <img src={LogoImg} alt="Logo"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente e encontre um herói para te ajudar.</p>
          <Link  to="/profile" className="linkback"> <FiArrowLeft size={16} color="#E02041" /> Voltar para o perfil.</Link>

        </section>

        <div className="inputs-form">

          <form onSubmit={handleNewIncidents}>

            <input 
            placeholder="Título do caso"
            value={title}
            onChange={ e => setTitle(e.target.value)}
            />

            <textarea 
            placeholder="Descrição do seu caso"
            value={description}
            onChange={ e => setDescription(e.target.value)}
            />

            <input 
            placeholder="Valor em reais" 
            value={value}
            onChange={ e => setValue(e.target.value)}
            />

            <button className="button" type="submit">Cadastrar</button>

          </form>

        </div>
      </div>
    </div>
  );
}
