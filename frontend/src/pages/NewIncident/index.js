import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident(){
    const [title, setCaso] = useState();
    const [description, setDescricao] = useState();
    const [value, setValor] = useState();
    const history = useHistory();


    async function handleSubmit(e){

        e.preventDefault();

        const ongId = localStorage.getItem('ongId');

        const data = {
            title,
            description,
            value,
        };

            try {
                await api.post('/incidents', data, {
                    headers: {
                        Authorization: ongId,
                    },
                });

                history.push('/profile');
            } catch (error) {
                alert('Erro ao cadastrar caso, tente novamente.')
            }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero" />
                
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                
                    <Link className="back-link" to="/profile"><FiArrowLeft size={16} color="red"/>Voltar para home</Link>

                </section>

                <form onSubmit={handleSubmit}>

                    <input 
                    placeholder="Título do caso" 
                    value={title} 
                    onChange={e => setCaso(e.target.value)} 
                    />

                    <textarea 
                    placeholder="Descrição" 
                    value={description} 
                    onChange={e => setDescricao(e.target.value)} 
                    />

                    <input 
                    placeholder="Valor em R$" 
                    value={value}
                    onChange={e => setValor(e.target.value)} 
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}