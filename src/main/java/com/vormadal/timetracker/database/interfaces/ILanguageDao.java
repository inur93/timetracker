package com.vormadal.timetracker.database.interfaces;

import com.vormadal.mongodb.BaseDao;
import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.models.Language;

/**
 * Created: 27-07-2019
 * author: Runi
 */

public interface ILanguageDao extends BaseDao<Language, String> {
    Language updatePartial(String id, Language language) throws MorphiaException;

    void deleteKey(String lang, String key);
}
