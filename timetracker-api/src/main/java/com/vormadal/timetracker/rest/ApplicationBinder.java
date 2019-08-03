package com.vormadal.timetracker.rest;

import com.vormadal.mongodb.DbProvider;
import com.vormadal.timetracker.database.LanguageDao;
import com.vormadal.timetracker.database.MorphiaProvider;
import com.vormadal.timetracker.database.TimeRegistrationDao;
import com.vormadal.timetracker.database.UserDao;
import com.vormadal.timetracker.database.interfaces.ILanguageDao;
import com.vormadal.timetracker.database.interfaces.ITimeRegistrationDao;
import com.vormadal.timetracker.database.interfaces.IUserDao;
import com.vormadal.timetracker.rest.services.LocalizationService;
import org.glassfish.hk2.utilities.binding.AbstractBinder;

/**
 * <p>Created: 25-05-2019</p>
 * <p>author: Runi</p>
 */

public class ApplicationBinder extends AbstractBinder {
    @Override
    protected void configure() {
        bind(MorphiaProvider.class).to(DbProvider.class);
        bind(UserDao.class).to(IUserDao.class);
        bind(TimeRegistrationDao.class).to(ITimeRegistrationDao.class);
        bind(LanguageDao.class).to(ILanguageDao.class);
    }
}
