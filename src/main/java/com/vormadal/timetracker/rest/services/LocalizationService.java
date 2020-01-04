package com.vormadal.timetracker.rest.services;

import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.database.interfaces.ILanguageDao;
import com.vormadal.timetracker.database.interfaces.ILocaleDao;
import com.vormadal.timetracker.models.*;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;

/**
 * <p>Created: 27-07-2019</p>
 * <p>author: Runi</p>
 */

@Path("/localization")
public class LocalizationService {

    private ILanguageDao languageDao;
    private ILocaleDao localeDao;

    @Inject
    public LocalizationService(ILanguageDao languageDao, ILocaleDao localeDao){
        this.languageDao = languageDao;
        this.localeDao = localeDao;
    }

    @GET
    @Path("/languages")
    public List<Language> getLanguages() throws MorphiaException {
        //TODO do not fetch all translations here
        return languageDao.getAll();
    }

    @RolesAllowed("admin")
    @POST
    @Path("/languages")
    public Language createLanguage(CreateLanguage lang) throws MorphiaException {
        Language language = lang.toLanguage();
        language.setId(lang.getShortName());
        return languageDao.create(language);
    }

    @RolesAllowed("admin")
    @PUT
    @Path("/languages/{lid}")
    public Language updateLanguage(@PathParam("lid") String id, UpdateLanguage lang) throws MorphiaException {
        return languageDao.update(id, lang.toLanguage());
    }

    @RolesAllowed("admin")
    @PUT
    @Path("/languages/{lid}/partial")
    public Language updatePartialLanguage(@PathParam("lid") String id, PartialUpdateLanguage lang) throws MorphiaException{
        return languageDao.updatePartial(id, lang.toLanguage());
    }

    @RolesAllowed("admin")
    @DELETE
    @Path("/languages/{lid}/{key}")
    public void deleteKey(@PathParam("lid") String lang, @PathParam("key") String key){
        languageDao.deleteKey(lang, key);
    }

    @GET
    @Path("/languages/{lid}")
    public Language getLanguage(@PathParam("lid") String id) throws MorphiaException {
        return languageDao.get(id);
    }

    @GET
    @Path("/locales")
    public List<Locale> getLocales() throws MorphiaException {
        return localeDao.getAll();
    }

}
