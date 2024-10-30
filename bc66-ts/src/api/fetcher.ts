import axios from "axios";
import { BASE_URL, TOCKEN_CYBER_SOFT } from "../constants/urlCogfig";
import { CurrentUser } from "../interfaces/user.interface";
import { getLocalSorage } from "../untils";

const fetcher = axios.create({
    baseURL: BASE_URL,
    headers: {
    TokenCybersoft:TOCKEN_CYBER_SOFT

    }
}
)


fetcher.interceptors.request.use((config) => { 
    const currentUser = getLocalSorage<CurrentUser>("user")
    
    config.headers = {
        ...config.headers,
        Authorization :currentUser ?`Bearer ${currentUser.accessToken}`:""
    } as any

    return config
 })
export default fetcher