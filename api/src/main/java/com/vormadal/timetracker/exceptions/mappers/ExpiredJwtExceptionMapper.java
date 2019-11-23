package com.vormadal.timetracker.exceptions.mappers;

import com.vormadal.timetracker.models.BasicExceptionMessage;
import io.jsonwebtoken.ExpiredJwtException;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

/**
 * <p>Created: 26-05-2019</p>
 * <p>author: Runi</p>
 */

public class ExpiredJwtExceptionMapper implements ExceptionMapper<ExpiredJwtException> {
    @Override
    public Response toResponse(ExpiredJwtException exception) {
        return Response
                .status(Response.Status.UNAUTHORIZED)
                .type(MediaType.APPLICATION_JSON)
                .entity(BasicExceptionMessage.builder()
                        .status(Response.Status.UNAUTHORIZED.getStatusCode())
                        .message("token has expired")
                        .build())
                .build();
    }
}
