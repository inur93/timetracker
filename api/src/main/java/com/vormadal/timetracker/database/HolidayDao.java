package com.vormadal.timetracker.database;

import com.vormadal.mongodb.DbProvider;
import com.vormadal.mongodb.MongoBaseDao;
import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.database.interfaces.IHolidayDao;
import com.vormadal.timetracker.models.Holiday;
import org.bson.types.ObjectId;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;

/**
 * <p>Created: 23-11-2019</p>
 * <p>author: Runi</p>
 */

public class HolidayDao extends MongoBaseDao<Holiday, ObjectId> implements IHolidayDao {
    @Inject
    public HolidayDao(DbProvider provider) {
        super(provider, Holiday.class);
    }

    @Override
    public Holiday update(ObjectId id, Holiday element) throws MorphiaException {
        return null;
        //return update(id, element, UpdateHoliday.class);
    }

    @Override
    public List<Holiday> getByDateRange(String configuration, Date from, Date to) {
        //query().field()
        return null;
    }
}
