import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { accountService } from '../services/account.service';

// import './auth.css'

const Login = () => {
    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({})

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        accountService.login(credentials)
            .then(res => {
                accountService.saveToken(res.data.access_token)
                navigate('/user', { replace: true })
            })
            .catch(error => console.log(error))
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={credentials.email} onChange={onChange} />
            </div>
            <div className="group">
                <label htmlFor="password">Mot de passe</label>
                <input type="text" name="password" value={credentials.password} onChange={onChange} />
            </div>
            <div className="group">
                <button>Connexion</button>
            </div>
        </form>
    );
};

export default Login;