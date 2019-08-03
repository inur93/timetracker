package com.vormadal.timetracker.database.interfaces;

import com.vormadal.mongodb.BaseDao;
import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.models.TimeRegistration;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;

/**
 * <p>Created: 25-05-2019</p>
 * <p>author: Runi</p>
 */

public interface ITimeRegistrationDao extends BaseDao<TimeRegistration, ObjectId> {

    List<TimeRegistration> getByPeriod(String user, Date from, Date to, String q);
    List<TimeRegistration> getByPeriod(Date from, Date to, String q);

    TimeRegistration update(ObjectId id, String id1, TimeRegistration timeRegistration) throws MorphiaException;

    void delete(ObjectId objectId, String id);
}
