import { decorate, observable, autorun, action, flow, computed } from 'mobx';
import { toast } from '../App';
import enLocale from 'date-fns/locale/en-GB';
export default class LocalizationStore {

    api;

    languages = [];
    locales = [];
    currentLanguageKey = localStorage.getItem('lang') || 'en';
    currentLocale = enLocale;

    dictionary = observable.map({});
    missingTranslations = [];

    constructor(api) {
        this.api = api;
        this.missingTranslations = JSON.parse(localStorage.getItem('translations') || "[]");
        this.loadAllLanguages();
        this.loadAllLocales();
        autorun(() => {
            localStorage.setItem('translations', JSON.stringify(this.missingTranslations));
        })
        autorun(() => {
            localStorage.setItem('lang', this.currentLanguageKey);
        })

        autorun(() => {
            if (this.currentLanguage && this.locales.length > 0) {
                let locale = this.locales.find(x => x.id === this.currentLanguage.locale);
                if (locale) {
                    try {
                        import(`date-fns/locale/${locale.path}`)
                            .then(module => {
                                this.currentLocale = module;
                            })
                    }catch(e){
                        console.error("could not load locale", e);
                    }
                }
            }
        })

        autorun(() => {
            if (this.currentLanguage) {
                const translations = this.currentLanguage.translations || {};
                const keys = Object.keys(translations);
                keys.forEach(key => {
                    this.dictionary.set(key, translations[key])
                })
            }
        })
    }

    get currentLanguageName() {
        if (this.currentLanguage && this.currentLanguage.displayName) {
            return this.currentLanguage.displayName;
        }
        return this.currentLanguageKey;
    }

    get currentLanguage() {
        return this.languages.find(l => l.shortName === this.currentLanguageKey);
    }

    loadAllLanguages = flow(function* () {
        const langs = yield this.api.all();
        this.languages = langs;
    }).bind(this);

    loadAllLocales = flow(function* () {
        this.locales = yield this.api.allLocales();
    }).bind(this);

    saveTranslations = flow(function* (language, translations) {
        const update = yield this.api.updatePartial(language, { translations });
        toast.success("Saved translations");

        let toBeDeleted = this.languages.find(l => l.shortName === update.shortName);
        this.languages.splice(this.languages.indexOf(toBeDeleted), 1, update);
    }).bind(this);

    deleteKey = flow(function* (language, key) {
        this.missingTranslations.splice(this.missingTranslations.indexOf(key), 1);
        if (!key.includes(".") && key.includes("$")) {
            try {
                yield this.api.deleteKey(language, key);
            } catch (e) {
                //probably invalid key that is not in database anyways
            }
        }
        yield this.loadAllLanguages();

    }).bind(this);

    getValue = (key) => {
        //remove not allowed characters - keys in Mongo are not allowed to contain '.' and '$'
        const sanitized = (key || "").replace(".", "").replace("$", "");
        const value = this.dictionary.get(sanitized);
        if (value) {
            return value;
        }

        if (!this.missingTranslations.find(x => x === sanitized)) {
            this.missingTranslations.push(sanitized);
        }
        return key;
    }
}

decorate(LocalizationStore, {
    languages: observable,
    locales: observable,
    editingLanguage: observable,
    currentLanguageKey: observable,
    currentLanguage: computed,
    missingTranslations: observable,
    setCurrentLanguage: action,
    loadAllLanguages: action,
    currentLanguageName: computed,
    currentLocale: observable
})