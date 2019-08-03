package com.vormadal.timetracker.database;

import com.vormadal.mongodb.MorphiaHandler;
import com.vormadal.mongodb.SetupHandler;
import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.models.User;

import java.util.HashSet;

import static com.vormadal.timetracker.utils.PasswordUtil.generateSaltedHash;
import static java.util.Arrays.asList;

/**
 * <p>Created: 15-05-2019</p>
 * <p>author: Runi</p>
 */
public class UserSetupHandler implements SetupHandler {

    @Override
    public void onSetup(MorphiaHandler morphiaHandler) {

        UserDao repository = new UserDao(morphiaHandler);
        if(repository.findByUsername("admin").isPresent()) return;
        try {
            repository.create(User.builder()
                    .username("admin")
                    .roles(new HashSet(asList("user", "admin")))
                    .hash(generateSaltedHash("admin"))
                    .build());
        } catch (MorphiaException e) {
            e.printStackTrace();
        }
    }
}
