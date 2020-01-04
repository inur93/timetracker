package com.vormadal.timetracker.models;

import com.vormadal.mongodb.annotations.FieldsClass;
import com.vormadal.mongodb.annotations.PartialClass;
import com.vormadal.mongodb.annotations.PartialClasses;
import dev.morphia.annotations.Field;
import dev.morphia.annotations.Index;
import dev.morphia.annotations.IndexOptions;
import dev.morphia.annotations.Indexes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>Created: 27-07-2019</p>
 * <p>author: Runi</p>
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldsClass
@PartialClasses(
        {
                @PartialClass(name = "CreateLanguage", includeFields = {"displayName", "shortName"}),
                @PartialClass(name = "UpdateLanguage", includeFields = {"displayName", "shortName", "translations"}),
                @PartialClass(name = "PartialUpdateLanguage", includeFields = {"translations"})
        }
)
@Indexes(@Index(fields = {@Field("shortName")}, options = @IndexOptions(unique = true)))
public class Language extends BaseModel<String> {
    private boolean isDefault; //probably not necessary
    private String shortName;
    private String displayName;
    private String locale; //ID

    private Map<String, String> translations;

    private Date created;

}
