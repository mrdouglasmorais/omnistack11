import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi";

import api from '../../services/api'

import './style.css';

import LogoImg from '../../assets/logo.svg';
import ImgHeroes from '../../assets/heroes.png';

export default function Logon() {

  const usehistory = useHistory()

  const [id, setID ] = useState('')

  async function handlerLogon(e){
    e.preventDefault()

    try {
      const response = await api.post('session', { id })

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)

      usehistory.push('/profile')
    } catch (err) {
      alert('Ooopss, parece que algo deu errado.')
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img className="logo" src={LogoImg} alt="Logo" />

        <form onSubmit={handlerLogon}>
          <h1>Faça seu logon</h1>

          <input placeholder="Sua ID"
          value={id}
          onChange={ e => setID(e.target.value)} 
          />

          <button className="button" type="submit" >Entrar</button>
        </form>
        <Link  to="/register" className="linkback"> <FiLogIn size={16} color="#E02041" /> Não tenho cadastro.</Link>
      </section>

      <img src={ImgHeroes} alt="Heroes"/>
    </div>
  )
}
