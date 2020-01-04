package com.vormadal.timetracker.models;

import com.vormadal.mongodb.annotations.FieldsClass;
import com.vormadal.mongodb.annotations.PartialClass;
import com.vormadal.mongodb.annotations.PartialClasses;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.util.Date;

/**
 * <p>Created: 11-08-2019</p>
 * <p>author: Runi</p>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldsClass
@PartialClasses(
        {
                @PartialClass(name = "UpdateHoliday", includeFields = {"name", "from", "to", "validTo", "repeat"}),
                @PartialClass(name = "CreateHoliday", includeFields = {"countryConfigurationId", "name", "from", "to", "validTo", "repeat"})
        }
)
public class Holiday extends BaseModel<ObjectId> {

    private String countryConfigurationId;
    private String name;

    private double part; // 0-1 if full holiday use 1
    private Date from;
    private Date to;

    private Date validTo;
    private boolean repeat;

    public boolean getRepeat(){
        return repeat;
    }
}
