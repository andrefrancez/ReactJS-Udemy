import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useRequests } from "./request";
import { setUser, setUserEnterprise } from "./redux/reducers/authReducer";

const LOCAL_STORAGE_KEY = 'AUTH_ACCESS';

export const handleGetAccessToken = () => localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';

export const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()

    const {signIn, getUser} = useRequests()

    const user = {
        user: auth.user,
        enterprise: auth.enterprise
    }
    
    const handleInitUser = async () => {
        const access_token = handleGetAccessToken()
        if(!access_token) return

        const response = await getUser()

        if(!response.detail){
            dispatch(setUser(response.data.user))
            dispatch(setUserEnterprise(response.data.enterprise))
        }
    }

    const handlePermissionExists = (permissionCodeName: string) => {
        if(auth.enterprise.is_owner) return true

        return auth.enterprise.permissions.some(p => p.codename == permissionCodeName)
    }

    const handleSignIn = async (email: string, password: string) => {
        const response = await signIn({email, password})

        if(!response.detail){
            dispatch(setUser(response.data.user))
            dispatch(setUserEnterprise(response.data.enterprise))

            // Salvar Token de Acesso
            localStorage.setItem(LOCAL_STORAGE_KEY, response.data.access)
        }

        return response;
    }

    const handleSignOut = () => {
        dispatch(setUser(null))
        dispatch(setUserEnterprise(null))

        localStorage.removeItem(LOCAL_STORAGE_KEY)
    }



    return{
        user,
        handleInitUser,
        handlePermissionExists,
        handleSignIn,
        handleSignOut,
        isLogged: auth.user != null
    }
}