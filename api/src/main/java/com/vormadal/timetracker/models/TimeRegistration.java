package com.vormadal.timetracker.models;

import com.vormadal.mongodb.annotations.FieldsClass;
import com.vormadal.mongodb.annotations.PartialClass;
import com.vormadal.mongodb.annotations.PartialClasses;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.util.Date;

/**
 * <p>Created: 15-05-2019</p>
 * <p>author: Runi</p>
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldsClass
@PartialClasses({
        @PartialClass(name = "CreateTimeRegistration", excludeFields = {"user"}),
        @PartialClass(name = "UpdateTimeRegistration", excludeFields = {"user"})
})
public class TimeRegistration extends BaseModel<ObjectId> {

    private String user;
    private Date date;
    private double timeRegistered;
    private TimeRegistrationType type;
    private String comment;

}
