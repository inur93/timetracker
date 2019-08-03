package com.vormadal.timetracker.models;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;

/**
 * <p>Created: 26-05-2019</p>
 * <p>author: Runi</p>
 */
@Provider
@Produces(MediaType.APPLICATION_JSON)
public class CustomObjectMapper extends JacksonJaxbJsonProvider {

    private static ObjectMapper mapper = new ObjectMapper();

    static {
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    }

    public CustomObjectMapper() {
        super();
        setMapper(mapper);
    }
}
