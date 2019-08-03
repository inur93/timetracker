package com.vormadal.timetracker.database;

import com.vormadal.mongodb.DbProvider;
import com.vormadal.mongodb.MongoBaseDao;
import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.database.interfaces.ILanguageDao;
import com.vormadal.timetracker.models.Fields;
import com.vormadal.timetracker.models.Language;
import com.vormadal.timetracker.models.UpdateLanguage;
import dev.morphia.query.Query;
import dev.morphia.query.UpdateOperations;
import org.jvnet.hk2.annotations.Service;

import javax.inject.Inject;

/**
 * <p>Created: 27-07-2019</p>
 * <p>author: Runi</p>
 */
@Service
public class LanguageDao extends MongoBaseDao<Language, String> implements ILanguageDao {

    @Inject
    public LanguageDao(DbProvider provider) {
        super(provider, Language.class);
    }


    @Override
    public Language update(String id, Language element) throws MorphiaException {
        return update(id, element, UpdateLanguage.class);
    }

    @Override
    public Language updatePartial(String id, Language language) throws MorphiaException {
        Query<Language> query = query(id);
        UpdateOperations<Language> operations = updateOperation();
        language.getTranslations().forEach((key, value) -> {
            operations.set(Fields.Language.translations +"."+key, value);
        });
        ds().update(query, operations);
        return get(id);
    }
}
