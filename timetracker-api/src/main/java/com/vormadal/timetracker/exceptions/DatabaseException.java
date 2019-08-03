package com.vormadal.timetracker.exceptions;

import com.vormadal.timetracker.models.BasicExceptionMessage;

import javax.ws.rs.core.Response;

/**
 * <p>Created: 22-05-2019</p>
 * <p>author: Runi</p>
 */

public class DatabaseException extends BaseException {
    public DatabaseException(String msg){
        super(msg, Response.Status.BAD_REQUEST);
    }

    @Override
    public Object getBody() {
        return BasicExceptionMessage.builder().message(getMessage()).status(getStatus()).build();
    }
}
