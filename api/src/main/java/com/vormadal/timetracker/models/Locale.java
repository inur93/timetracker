package com.vormadal.timetracker.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

/**
 * <p>Created: 04-08-2019</p>
 * <p>author: Runi</p>
 */
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Locale extends BaseModel<ObjectId> {

    private String path; //matches the path of date-fns module
    private String name;
}
