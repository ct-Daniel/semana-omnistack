import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile(){
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')
    const [incidents, setIncidents] = useState([])
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            },
        }).then(Response => {
            setIncidents(Response.data);
            console.log(Response);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                },
            });
            setIncidents(incidents.filter(incident => incidents.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso')
        }
    }

    function handleLogout(){
        localStorage.clear('ongId');
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="be the hero" />
                <span>Bem vinda, {ongName}</span>
            
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower onClick={handleLogout}/>
                </button>

            </header>


            <h1>Casos cadastrados</h1>


            <ul>
            {incidents.map(incidents => (   
                <li key={incidents.id}>
                    <strong>CASO:</strong>
                    <p>{incidents.title}</p>

                    <strong>CASO:</strong>
                    <p>{incidents.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>

                    <button className="button-delete" type="button" onClick={() => handleDeleteIncident(incidents.id)} ><FiTrash2 size={20} color="a8a8b3"/></button>
                </li>))}
            </ul>
        </div>
    );
}

