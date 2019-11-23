package com.vormadal.timetracker.database.interfaces;

import com.vormadal.mongodb.BaseDao;
import com.vormadal.timetracker.models.Locale;
import org.bson.types.ObjectId;

/**
 * Created: 04-08-2019
 * author: Runi
 */

public interface ILocaleDao extends BaseDao<Locale, ObjectId> {
}
