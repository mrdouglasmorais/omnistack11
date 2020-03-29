import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from "react-icons/fi";

import './style.css';

import LogoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile() {

  const usehistory = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then( response => {
      setIncidents(response.data);
    })
  }, [ongId])

  async function deleteHandleIncidents(id){
    try {
      await api.delete(`incidents/${id}`, {
      headers: {
        Authorization: ongId
      }})
      setIncidents(incidents.filter( incidents => incidents.id !== id ))
    } catch (err) {
      alert('Erro ao deletar, tente novamente')
      
    }
  }

  function handleLogout() {
    localStorage.clear();
    usehistory.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="be the Hero"/>
        <span>Bem vindo, {ongName}</span>  
          <Link className="button" to="incidents/new"> Cadastrar novo caso</Link>
          <button type="button" onClick={handleLogout}>
            <FiPower size={18} color="#E02041" />
          </button>
      </header> 
      <h1>Casos cadastrados</h1>
      <ul>

        {incidents.map(incidents => (
          <li key={incidents.id}>
          <strong>CASO:</strong>
          <p>{incidents.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incidents.description}</p>

          <strong>VALOR</strong>
          <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.value)}</p>

          <button type="button" onClick={ () => deleteHandleIncidents(incidents.id)}>
            <FiTrash2 size={20} color="a8a8b3"/>
          </button>
        </li>
        ))}
        
      </ul>
    </div>
  );
}
