package com.vormadal.timetracker.database;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.vormadal.mongodb.MorphiaHandler;
import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.mongodb.options.DbOptions;
import org.jvnet.hk2.annotations.Service;

import static dk.agenia.configservice.Configuration.get;

/**
 * <p>Created: 15-05-2019</p>
 * <p>author: Runi</p>
 */
@Service
public class MorphiaProvider extends MorphiaHandler {



    public MorphiaProvider() throws MorphiaException {
        super(new UserSetupHandler(), new DbOptions().mongoClient(new MongoClient(
                new MongoClientURI(get("timetracker_db", "db"))
        ))
        .database("timetracker")
        .modelsPackages("com.vormadal.timetracker.models"));
    }



}