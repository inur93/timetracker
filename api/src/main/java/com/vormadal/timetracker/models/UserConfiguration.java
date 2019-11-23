package com.vormadal.timetracker.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * <p>Created: 11-08-2019</p>
 * <p>author: Runi</p>
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserConfiguration {

    private Date timeregistrationStarts;
    private double avgHoursDay = 8;
    private TimeRegistrationType defaultType = TimeRegistrationType.WORK;

}
