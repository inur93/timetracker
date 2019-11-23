package com.vormadal.timetracker.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vormadal.mongodb.annotations.FieldsClass;
import com.vormadal.mongodb.models.HasId;
import dev.morphia.annotations.Id;
import lombok.Data;
import org.bson.types.ObjectId;

/**
 * <p>Created: 15-05-2019</p>
 * <p>author: Runi</p>
 */
@FieldsClass
@Data
public class BaseModel<T> implements HasId<T> {
    @Id
    private T id;

    @JsonIgnore
    @Override
    public T get_id() {
        return id;
    }

    public String getId(){
        return id == null ? null : id.toString();
    }
}
