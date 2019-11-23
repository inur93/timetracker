import { decorate, observable, flow } from "mobx";
import jwt from "../common/jwt.service";
import { toast } from "../App";

class AuthStore {

    loading = true;
    self = null;
    api;
    userApi;
    constructor(api, userApi) {
        this.api = api;
        this.userApi = userApi;
        if (this.validateToken(jwt.getToken())) {
            this.loadSelf();
        } else {
            jwt.destroyToken();
            this.loading = false;
        }

    }

    validateToken = (token) => {
        if (!token || !token.split) {
            return false;
        }
        const parts = token.split('.');
        if (parts.length < 1) {
            console.warn("token has wrong encoding: ", token);
            return false;
        }

        const claims = JSON.parse(atob(parts[1]));
        const expires = claims.exp * 1000;
        if (expires < Date.now()) {
            return false;
        }

        return true;
    }

    handleLogin = (credentials) => {
        this.api.signIn(credentials)
            .then(tokenContainer => {
                const token = tokenContainer.token;
                jwt.saveToken(token);
                this.loadSelf();
            });
    }

    loadSelf = flow(function* () {
        this.loading = true;
        try {
            const user = yield this.userApi.self();
            toast.info("Welcome {0}", [user.firstname || user.username]);
            this.self = user;
        } catch (e) {
            toast.error("Could not load self");
        }
        this.loading = false;
    }).bind(this);

    updateSelf = flow(function* ({ firstname, lastname }) {
        try {
            const user = yield this.userApi.updateSelf({ firstname, lastname });
            this.self = user;
            toast.success("Changes have been saved");
        } catch (e) {
            toast.error("Could not complete update. Error: {0}", [e.message]);
            return false;
        }
        return true;
    }).bind(this);

    registerUser = flow(function* (user) {
        try {
            yield this.api.registerUser(user);
            toast.success("Congratulations {0} you have just registered to TimeTracker", [user.firstname || user.username]);
            yield this.handleLogin({ username: user.username, password: user.password });
        } catch (e) {
            toast.error("Could not register new user. {0}", [e.message]);
        }
    }).bind(this);
}

export default AuthStore;

decorate(AuthStore, {
    loading: observable,
    self: observable
});