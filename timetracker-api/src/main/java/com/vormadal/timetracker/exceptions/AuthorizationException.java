package com.vormadal.timetracker.exceptions;

import com.vormadal.timetracker.models.BasicExceptionMessage;
import com.vormadal.timetracker.rest.filters.AuthenticationFilter;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * <p>Created: 23-05-2019</p>
 * <p>author: Runi</p>
 */
public class AuthorizationException extends BaseException{
    public AuthorizationException(String msg){
        super(msg, Response.Status.FORBIDDEN);
    }

    @Override
    public Object getBody() {
        return BasicExceptionMessage.builder()
                .message(getMessage())
                .status(getStatus())
                .build();
    }
}
