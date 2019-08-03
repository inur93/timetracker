package com.vormadal.timetracker.database;

import com.vormadal.mongodb.DbProvider;
import com.vormadal.mongodb.MongoBaseDao;
import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.database.interfaces.IUserDao;
import com.vormadal.timetracker.models.Fields;
import com.vormadal.timetracker.models.User;
import dev.morphia.query.Query;
import dev.morphia.query.UpdateOperations;
import dev.morphia.query.UpdateResults;
import org.bson.types.ObjectId;
import org.jvnet.hk2.annotations.Service;

import javax.inject.Inject;
import java.util.Optional;

/**
 * <p>Created: 15-05-2019</p>
 * <p>author: Runi</p>
 */
@Service
public class UserDao extends MongoBaseDao<User, ObjectId> implements IUserDao {
    @Inject
    public UserDao(DbProvider provider) {
        super(provider, User.class);
    }


    @Override
    public User update(ObjectId id, User element) throws MorphiaException {
        return this.update(id, element, User.class);
    }

    public Optional<User> findByUsername(String username) {
        return Optional.ofNullable(query().field(Fields.User.username).equalIgnoreCase(username).get());

    }

    @Override
    public boolean updatePassword(ObjectId id, String hash) {
        Query<User> query = query(id);
        UpdateOperations<User> operations = updateOperation().set(Fields.User.hash, hash);
        UpdateResults results = ds().update(query, operations);
        return results.getUpdatedCount() > 0;

    }
}
