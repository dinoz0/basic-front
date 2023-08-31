// axios
import axios from "axios";
// components
import { accountService } from "./account.service";

const Axios = axios.create({
    baseURL: process.env.REACT_APP_DB_PORT

})


// Intercepteur pour le token
Axios.interceptors.request.use(request => {

    if (accountService.isLogged()) {
        request.headers.Authorization = 'Bearer ' + accountService.getToken()
    }
    return request
})

Axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.responce.status === 401) {
        accountService.logout()
        window.location = '/admin/login'
    } else {
        return Promise.reject(error)
    }
})


export default Axios