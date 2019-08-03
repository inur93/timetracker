import { decorate, observable, autorun, action, flow, computed } from 'mobx';
import { toast } from '../App';

export default class LocalizationStore {

    api;

    languages = [];
    currentLanguageKey = localStorage.getItem('lang') || 'en';

    dictionary = observable.map({});
    missingTranslations = [];

    constructor(api) {
        this.api = api;
        this.missingTranslations = JSON.parse(localStorage.getItem('translations') || "[]");
        this.loadAllLanguages();
        autorun(() => {
            localStorage.setItem('translations', JSON.stringify(this.missingTranslations));
        })
        autorun(() => {
            localStorage.setItem('lang', this.currentLanguageKey);
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

    saveTranslations = flow(function* (language, translations) {
        const update = yield this.api.updatePartial(language, { translations });
        toast.success("Saved translations");

        let toBeDeleted = this.languages.find(l => l.shortName === update.shortName);
        this.languages.splice(this.languages.indexOf(toBeDeleted), 1, update);
    }).bind(this);

    getValue = (key) => {
        const value = this.dictionary.get(key);
        if (value) {
            return value;
        }

        if (!this.missingTranslations.find(x => x === key)) {
            this.missingTranslations.push(key);
        }
        return key;
    }
}

decorate(LocalizationStore, {
    languages: observable,
    editingLanguage: observable,
    currentLanguageKey: observable,
    currentLanguage: computed,
    missingTranslations: observable,
    setCurrentLanguage: action,
    loadAllLanguages: action,
    currentLanguageName: computed
})