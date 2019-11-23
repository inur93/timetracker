package com.vormadal.timetracker.database.interfaces;

import com.vormadal.mongodb.BaseDao;
import com.vormadal.timetracker.models.Holiday;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;

/**
 * Created: 23-11-2019
 * author: Runi
 */

public interface IHolidayDao extends BaseDao<Holiday, ObjectId> {
    List<Holiday> getByDateRange(String configuration, Date from, Date to);

}
