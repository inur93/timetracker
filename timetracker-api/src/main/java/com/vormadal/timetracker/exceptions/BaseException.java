package com.vormadal.timetracker.exceptions;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * <p>Created: 23-05-2019</p>
 * <p>author: Runi</p>
 */
public abstract class BaseException extends Exception {
    private Response.Status status;
    public BaseException(String s, Response.Status status) {
        super(s);
        this.status = status;
    }

    public int getStatus(){
        return status.getStatusCode();
    }

    public abstract Object getBody();
}
