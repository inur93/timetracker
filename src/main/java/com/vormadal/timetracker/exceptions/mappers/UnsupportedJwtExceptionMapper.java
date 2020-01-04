package com.vormadal.timetracker.exceptions.mappers;

import com.vormadal.timetracker.models.BasicExceptionMessage;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.UnsupportedJwtException;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * <p>Created: 26-05-2019</p>
 * <p>author: Runi</p>
 */
@Provider
public class UnsupportedJwtExceptionMapper implements ExceptionMapper<UnsupportedJwtException> {
    @Override
    public Response toResponse(UnsupportedJwtException exception) {
        return Response
                .status(Response.Status.UNAUTHORIZED)
                .type(MediaType.APPLICATION_JSON)
                .entity(BasicExceptionMessage.builder()
                        .status(Response.Status.UNAUTHORIZED.getStatusCode())
                        .message("token does not represent an Claims JWS")
                        .build())
                .build();
    }
}
