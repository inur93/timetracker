package com.vormadal.timetracker.models;

import lombok.Builder;

/**
 * <p>Created: 23-05-2019</p>
 * <p>author: Runi</p>
 */
@Builder
public class BasicExceptionMessage {
    public String message;
    public int status;
}
