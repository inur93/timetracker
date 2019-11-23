import { decorate, observable, autorun, action, flow } from "mobx";
import { toast } from "../App";

export default class TimeRegistrationStore {

    timeRegistrations = [];
    loading = false;
    isSaving = false;

    from = null;
    to = null;
    query = "";
    searchEverything = false;

    api;
    constructor(api) {
        this.api = api;

        //init default values
        let from = new Date();
        from.setHours(0, 0, 0, 0);
        from.setDate(from.getDate()-from.getDay());
        this.from = from;
        let to = new Date();
        to.setHours(0,0,0,0);
        to.setDate(from.getDate()+7);
        this.to = to;

        this.searchEverything = localStorage.getItem("searchEverything") === "true";
        autorun(() => {
            localStorage.setItem("searchEverything", this.searchEverything);
        })
    }

    toggleSearchEverything = () => {
        this.searchEverything = !this.searchEverything;
        if(this.query){
            this.loadTimeRegistrations();
        }
    }
    setQuery = (query) => {
        this.query = query;
        this.loadTimeRegistrations();
    }
    get queryParams() {
        return {
            from: this.query && this.searchEverything ? undefined : this.from && this.from.getTime(),
            to: this.query && this.searchEverything ? undefined : (this.to && this.to.getTime()) + 1000*60*60*24,
            query: this.query
        }
    }
    loadTimeRegistrations = flow(function * () {
        const { to, from, query } = this.queryParams;
        this.timeRegistrations = yield this.fetchTimeRegistrations(from, to, query);
    }).bind(this);

    fetchTimeRegistrations = flow(function * (from, to, query){
        this.loading = true;
        let timeRegistrations = [];
        try {
            timeRegistrations = yield this.api.self(from, to, query);
        } catch (e) {
             toast.error("Could not load timeregistrations", [e.message]);
        }
        this.loading = false;
        return timeRegistrations;
    }).bind(this);

    createTimeRegistration = flow(function * (data) {
        const {comment, date, timeRegistered} = data;
        this.isSaving = true;
        yield this.api.create({date: new Date(date).getTime(), comment, timeRegistered});
        this.loadTimeRegistrations();
        this.isSaving = false;
    }).bind(this);

    updateDeleteRegistrations = flow(function * (list){
        let requests = list.map(update => {
            const {id, remove, ...data} = update;
            if(remove){
                return this.api.remove(id);
            }else{
                return this.api.update(id, data);
            }
        })
        yield Promise.all(requests);
        toast.success("changes have been saved");
        
    }).bind(this);
}

decorate(TimeRegistrationStore, {
    timeRegistrations: observable,
    searchEverything: observable,
    loading: observable,
    isSaving: observable,
    currentTimeRegistration: observable,
    intervalViewType: observable,
    from: observable,
    to: observable,
    toggleSearchEverything: action,
    setQuery: action
})