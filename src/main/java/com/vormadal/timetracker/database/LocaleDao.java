package com.vormadal.timetracker.database;

import com.vormadal.mongodb.DbProvider;
import com.vormadal.mongodb.MongoBaseDao;
import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.database.interfaces.ILocaleDao;
import com.vormadal.timetracker.models.Locale;
import org.bson.types.ObjectId;
import org.jvnet.hk2.annotations.Service;

import javax.inject.Inject;

/**
 * <p>Created: 04-08-2019</p>
 * <p>author: Runi</p>
 */
@Service
public class LocaleDao extends MongoBaseDao<Locale, ObjectId> implements ILocaleDao {
    @Inject
    public LocaleDao(DbProvider provider) {
        super(provider, Locale.class);
    }

    @Override
    public Locale update(ObjectId id, Locale element) throws MorphiaException {
        return update(id, element, Locale.class);
    }
}
