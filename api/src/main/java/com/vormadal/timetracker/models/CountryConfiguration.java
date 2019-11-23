package com.vormadal.timetracker.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

/**
 * <p>Created: 10-08-2019</p>
 * <p>author: Runi</p>
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CountryConfiguration extends BaseModel<ObjectId> {

    private String name;

}
