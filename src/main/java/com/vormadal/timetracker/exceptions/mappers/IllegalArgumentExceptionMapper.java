package com.vormadal.timetracker.exceptions.mappers;

import com.vormadal.timetracker.models.BasicExceptionMessage;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

/**
 * <p>Created: 26-05-2019</p>
 * <p>author: Runi</p>
 */

public class IllegalArgumentExceptionMapper implements ExceptionMapper<IllegalArgumentException> {
    @Override
    public Response toResponse(IllegalArgumentException exception) {
        return Response
                .status(Response.Status.BAD_REQUEST)
                .type(MediaType.APPLICATION_JSON)
                .entity(BasicExceptionMessage.builder()
                        .status(Response.Status.BAD_REQUEST.getStatusCode())
                        .message(exception.getMessage())
                        .build())
                .build();
    }
}
