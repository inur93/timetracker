package com.vormadal.timetracker.exceptions.mappers;

import com.vormadal.timetracker.exceptions.BaseException;
import lombok.NoArgsConstructor;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * <p>Created: 07-07-2019</p>
 * <p>author: Runi</p>
 */
@Provider
@NoArgsConstructor
public class BaseExceptionMapper implements ExceptionMapper<BaseException> {
    @Override
    public Response toResponse(BaseException exception) {
        int status = exception.getStatus();
        if(status == 0) status = Response.Status.INTERNAL_SERVER_ERROR.getStatusCode();
        return Response
                .status(status)
                .type(MediaType.APPLICATION_JSON)
                .entity(exception.getBody())
                .build();
    }
}
