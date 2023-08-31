/* eslint-disable */
//react
import React, { useEffect, useState } from "react";
// componsent
// import Navbar from "../../components/prive/AdminNavbar";
// axios
import Axios from "../services/caller.service";
// css
import "./ListUser.css";

const ListUser = () => {
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [sessionList, setSessionList] = useState([]);
    const [getError, SetGetError] = useState();
    const [enableAdd, SetEnableAdd] = useState("false");
    const [enableEdit, SetEnableEdit] = useState("false");
    const [enableDelete, SetEnableDelete] = useState("false");

    useEffect(() => {
        if (flag2 === false) {
            const form_session = Axios.get("/user")
                .then((res) => (form_session.innerHTML = setSessionList(res.data.data)))
                .catch((err) => {
                    SetGetError("true");
                });

            setFlag2(true);
        }
        console.log(sessionList)
        return;
    }, []);

    ///////////////////////////////////////////////////
    //création
    var valid = localStorage.getItem("res");
    if (flag === false && valid === "ok") {
        SetEnableAdd("ok");
        setTimeout(() => {
            SetEnableAdd("");
            localStorage.removeItem("res");
        }, 3000);

        setFlag(true);
    } else if (flag === false && valid === "error") {
        SetEnableAdd("error");
        setTimeout(() => {
            SetEnableAdd("");
            localStorage.removeItem("res");
        }, 3000);

        setFlag(true);
    }

    ///////////////////////////////////////////////////
    //modification
    var resEdit = localStorage.getItem("resEdit");
    if (flag === false && resEdit === "ok") {
        SetEnableEdit("ok");
        setTimeout(() => {
            SetEnableEdit("");
            localStorage.removeItem("resEdit");
        }, 3000);

        setFlag(true);

        setFlag(true);
    } else if (flag === false && resEdit === "error") {
        SetEnableEdit("error");
        setTimeout(() => {
            SetEnableEdit("");
            localStorage.removeItem("resEdit");
        }, 3000);

        setFlag(true);
    }

    ///////////////////////////////////////////////////
    //suppression
    const delSession = (sessionId) => {
        if (window.confirm("Confirmez-vous la suppression ?")) {
            Axios.delete("/user/" + sessionId)
                .then((res) => {
                    localStorage.setItem("resDelete", "ok");
                    window.location.replace("/user");
                })
                .catch((err) => {
                    SetGetError("true");
                    localStorage.setItem("resDelete", "error");
                });
        }
    };

    var resDelete = localStorage.getItem("resDelete");
    if (flag === false && resDelete === "ok") {
        SetEnableDelete("ok");
        setTimeout(() => {
            SetEnableDelete("");
            localStorage.removeItem("resDelete");
        }, 3000);

        setFlag(true);
    } else if (flag === false && resDelete === "error") {
        SetEnableDelete("error");
        setTimeout(() => {
            SetEnableDelete("");
            localStorage.removeItem("resDelete");
        }, 3000);

        setFlag(true);
    }

    const removeError = () => {
        SetGetError("");
        SetEnableAdd("");
        SetEnableEdit("");
        SetEnableDelete("");
        localStorage.removeItem("res");
        localStorage.removeItem("resEdit");
        localStorage.removeItem("resDelete");
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 sessionContainer">
                        <h1 className="adminSessionTitle">Sessions</h1>
                        <hr />
                        <div>
                            <a
                                className="btn btn-success"
                                href="/user/add"
                                onClick={removeError}
                                style={{ display: "inline-block", marginBottom: "15px" }}
                            >
                                nouvelle utilisateur
                            </a>

                        </div>
                        <div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" className="sessionCol">
                                            Id
                                        </th>
                                        <th scope="col" className="sessionCol">
                                            Email
                                        </th>
                                        <th scope="col" className="sessionCol">
                                            Mot de passe
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sessionList.map((sessionList) => (
                                        <tr key={sessionList.id}>
                                            <td>{sessionList.id}</td>
                                            <td className="sessionCol">{sessionList.email}</td>
                                            <td className="sessionCol">{sessionList.password}</td>
                                            <td className="">
                                                <a
                                                    className="btn"
                                                    onClick={removeError}
                                                    href={`/user/edit/${sessionList.id}`}
                                                >
                                                    <svg
                                                        style={{ marginTop: "-10px" }}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-pencil-fill"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                    </svg>
                                                </a>
                                            </td>
                                            <td className="">
                                                <button
                                                    className="btn"
                                                    onClick={() => delSession(sessionList.id)}
                                                >
                                                    <svg
                                                        style={{ marginTop: "-10px" }}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-x-lg"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListUser;