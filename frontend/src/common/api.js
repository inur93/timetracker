import axios from "axios";
import { API_URL } from "./config";
import endpoints from "./endpoins";
import jwt from "./jwt.service";
import { toast } from "../App";


const api = axios.create({
    baseURL: API_URL,
    responseType: "json",
})

api.interceptors.request.use((config) => {
    const token = jwt.getToken();
    if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {

    return Promise.reject(error);
});

api.interceptors.response.use((config) => {

    return config.data;
}, error => {
    if(!error || !error.response || !error.response.data){
        return Promise.reject("An unknown error occurred. Check your internet connection");
    }
    const status = error.response.status;
    if(status === 403){
        jwt.destroyToken();
    }
    toast.error(error.response.data.message);

    return Promise.reject(error);
})

const AuthApi = {
    signIn(credentials) {
        return api.post(endpoints.AUTH_SIGNIN, credentials);
    },
    resetPassword(updatedCredentials) {
        return api.post(endpoints.AUTH_RESETPASSWORD, updatedCredentials);
    },
    
    registerUser(user){
        return api.post(endpoints.AUTH_REGISTER, user);
    }
}

const UserApi = {
    self() {
        return api.get(endpoints.USERS_SELF);
    },
    updateSelf(user) {
        return api.put(endpoints.USERS_SELF, user);
    }
}

const LocalizationApi = {
    all(){
        return api.get(endpoints.LANGUAGES);
    },
    allLocales(){
        return api.get(endpoints.LOCALES);
    },
    create(language){
        return api.post(endpoints.LANGUAGES, language)
    },
    get(id){
        return api.get(endpoints.LANGUAGES_ID(id));
    },
    update(id, language){
        return api.put(endpoints.LANGUAGES_ID(id), language);
    },
    updatePartial(id, language){
        return api.put(endpoints.LANGUAGES_ID_PARTIAL(id), language)
    },
    deleteKey(id, key){
        return api.delete(endpoints.LANGUAGES_ID_KEY(id, key))
    }
}

const queryParams = (from, to, query) => {
    const params = {};
    if (from) params.from = from;
    if (to) params.to = to;
    if (query) params.query = query;
    return params;
}
const TimeRegistrationApi = {

    all(from, to, query) {
        

        return api.get(endpoints.TIMEREGISTRATIONS, {
            params: queryParams(from, to, query)
        });
    },
    self(from, to, query) {
        return api.get(endpoints.TIMEREGISTRATIONS_SELF, {
            params: queryParams(from, to, query)
        });
    },
    create(timeRegistration){
        return api.post(endpoints.TIMEREGISTRATIONS, timeRegistration);
    },
    update(id, timeRegistration) {
        return api.put(endpoints.TIMEREGISTRATIONS_ID(id), timeRegistration);
    },
    remove(id) {
        return api.delete(endpoints.TIMEREGISTRATIONS_ID(id));
    }
}

export default {
    AuthApi, UserApi, TimeRegistrationApi, LocalizationApi
};