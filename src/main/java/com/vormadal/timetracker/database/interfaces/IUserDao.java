package com.vormadal.timetracker.database.interfaces;

import com.vormadal.mongodb.BaseDao;
import com.vormadal.timetracker.models.User;
import org.bson.types.ObjectId;
import org.jvnet.hk2.annotations.Contract;

import java.util.Optional;

/**
 * Created: 25-05-2019
 * author: Runi
 */
@Contract
public interface IUserDao extends BaseDao<User, ObjectId> {
    Optional<User> findByUsername(String username);
    boolean updatePassword(ObjectId id, String hash);
    void incrementFailedAttempts(ObjectId id);
    void resetFailedAttempts(ObjectId id);

    void lockUser(ObjectId id);
}
