import Axios from "./caller.service"



let login = (credentials) => {
    return Axios.post('/login', credentials)
}

let saveToken = (token) => {
    window.sessionStorage.setItem('token', token)
}

let logout = () => {
    window.sessionStorage.removeItem('token')
}

let isLogged = () => {
    let token = window.sessionStorage.getItem('token')
    return !!token
}

let getToken = () => {
    return window.sessionStorage.getItem('token')
}

export const accountService = {
    login, saveToken, logout, isLogged, getToken
}
