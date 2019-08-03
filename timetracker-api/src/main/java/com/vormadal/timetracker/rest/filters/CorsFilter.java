package com.vormadal.timetracker.rest.filters;

import lombok.extern.slf4j.Slf4j;

import javax.annotation.Priority;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

import static javax.ws.rs.HttpMethod.OPTIONS;


/** Filter that allows CORS - disable for non-CORS
 * Created by Christian on 04-05-2017.
 */
@Slf4j
@Priority(500) //Before AuthorizationFilter (1000) to make sure that headers always get injected
@Provider
public class CorsFilter implements ContainerRequestFilter {
    @Context
    private HttpServletRequest request;
    @Context
    private HttpServletResponse response;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        log.trace("Request caught in CORS-Filter:" + (request == null ? "(request is null)" : request.getRequestURI()));

        if(response == null){
            log.warn("cors headers not set - response was not injected correctly");
        }else{
            setCORSHeaders(response);
        }

        if(requestContext.getRequest().getMethod().equals(OPTIONS)){
            Response response = Response
                    .status(Response.Status.OK)
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
                    .header("Access-Control-Allow-Headers","Content-Type, accept, headers, authorization")
                    .build();
            requestContext.abortWith(response);
        }
    }


    private void setCORSHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS, PATCH");
        response.setHeader("Access-Control-Allow-Headers","Content-Type, authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Expose-Headers","Authorization");
        response.setHeader("encoding", "utf-8");
    }

}
