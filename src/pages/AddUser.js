//react
import React, { useState } from "react";
// router 
import { useNavigate } from "react-router-dom";
// axios 
import Axios from "../services/caller.service";

// css
// import './SessionAdd.css'

const AddUser = () => {

    const [error, setError] = useState()

    const navigate = useNavigate()

    function handleSubmit(e) {

        // get the form element from dom
        const formElement = document.querySelector('form')

        // convertir le formulaire en JSON
        const getFormJSON = (form) => {
            const data = new FormData(form);
            return Array.from(data.keys()).reduce((result, key) => {
                if (result[key]) {
                    result[key] = data.getAll(key)
                    return result
                }
                result[key] = data.get(key);
                return result;
            }, {});
        };
        // Prevent the browser from reloading the page
        e.preventDefault();
        const valid = formElement.reportValidity();
        const result = getFormJSON(formElement);

        if (valid) {
            Axios({
                method: 'put',
                url: '/user',
                data: result,
                withCredentials: false
            })
                .then(res => {
                    localStorage.setItem("res", "ok");

                    navigate("/user")
                })
                .catch(err => {
                    if (err.response.status === 409) {
                        setError(err.response.status)
                        setTimeout(() => {
                            setError("")
                        }, 3000);
                    }
                    localStorage.setItem("res", "error");
                })
        }
    }




    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-12 col-md-12 sessionContainer'>
                        <h1 className='adminSessionTitle'>Nouvelle utilisateur</h1>
                        {error === 409 && (
                            <div style={{ display: "inline-block" }}>
                                <p className='btn' style={{ display: "inline-block", marginLeft: "30px", backgroundColor: "#F5A69E", cursor: "default" }}>L'utilisateur existe déjà.</p>
                            </div>
                        )}
                        {error === "Invalid Date Format" && (
                            <div style={{ display: "inline-block" }}>
                                <p className='btn' style={{ display: "inline-block", marginLeft: "30px", backgroundColor: "#F5A69E", cursor: "default" }}>La date doit être saisie au format dd/mm/yyyy .</p>
                            </div>
                        )}
                        {error === "Invalid Time Range Format" && (
                            <div style={{ display: "inline-block" }}>
                                <p className='btn' style={{ display: "inline-block", marginLeft: "30px", backgroundColor: "#F5A69E", cursor: "default" }}>L'heure doit être au format (00h00 - 00h00) .</p>
                            </div>
                        )}
                        <hr />

                        <div>

                            <form id="form" onSubmit={handleSubmit} className="form-horizontal">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="sessionCol">Email</th>
                                            <th scope="col" className="sessionCol">Mot de passe</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td><div className="form-group sessionForm"><input className="form-control input-sm" type="text" name="email" id="email" placeholder="email" required /></div></td>
                                            <td><div className="form-group sessionForm"><input className="form-control input-sm" type="text" name="password" id="password" placeholder="mot de passe" required /></div></td>
                                            <td className="">
                                                <button type="submit" className='btn'><svg xmlns="http://www.w3.org/2000/svg" width="26" height="32" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" /></svg></button>
                                            </td>
                                            <td className="">
                                                <a className='btn' href="/user"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" /></svg></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser