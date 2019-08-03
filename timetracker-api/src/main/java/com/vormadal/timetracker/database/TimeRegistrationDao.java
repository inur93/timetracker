package com.vormadal.timetracker.database;

import com.vormadal.mongodb.DbProvider;
import com.vormadal.mongodb.MongoBaseDao;
import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.database.interfaces.ITimeRegistrationDao;
import com.vormadal.timetracker.models.Fields;
import com.vormadal.timetracker.models.TimeRegistration;
import com.vormadal.timetracker.models.UpdateTimeRegistration;
import dev.morphia.query.Query;
import org.bson.types.ObjectId;
import org.jvnet.hk2.annotations.Service;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;

/**
 * <p>Created: 22-05-2019</p>
 * <p>author: Runi</p>
 */
@Service
public class TimeRegistrationDao extends MongoBaseDao<TimeRegistration, ObjectId> implements ITimeRegistrationDao {
    @Inject
    public TimeRegistrationDao(DbProvider provider) {
        super(provider, TimeRegistration.class);
    }

    @Override
    public TimeRegistration update(ObjectId id, TimeRegistration element) throws MorphiaException {
        return update(id, element, UpdateTimeRegistration.class);
    }

    @Override
    public List<TimeRegistration> getByPeriod(String user, Date from, Date to, String q) {
        Query<TimeRegistration> query = query();
        if(user != null) query = query.field(Fields.TimeRegistration.user).equal(user);
        if(from != null) query = query.field(Fields.TimeRegistration.date).greaterThanOrEq(from);
        if(to != null) query = query.field(Fields.TimeRegistration.date).lessThan(to);
        if(q != null) query = query.field(Fields.TimeRegistration.comment).containsIgnoreCase(q);
        return query.asList();


    }

    @Override
    public List<TimeRegistration> getByPeriod(Date from, Date to, String q) {
        return getByPeriod(null, from, to, q);
    }

    @Override
    public TimeRegistration update(ObjectId id, String user, TimeRegistration timeRegistration) throws MorphiaException {
        if(query(id).field(Fields.TimeRegistration.user).equal(user).count() > 0){
            return update(id, timeRegistration, UpdateTimeRegistration.class);
        }else{
            throw new MorphiaException("query does not match any documents. id: " + id.toString() + ", user: " + user);
        }
    }

    @Override
    public void delete(ObjectId id, String user) {
        ds().delete(query(id).field(Fields.TimeRegistration.user).equal(user));
    }
}
