import { Navigate } from "react-router";
import { accountService } from "./account.service";

const AuthGuard = ({ children }) => {

    if (!accountService.isLogged()) {
        return <Navigate to="/login" />
    }

    return children

}

export default AuthGuard