package com.vormadal.timetracker.rest;

import com.vormadal.timetracker.models.CustomObjectMapper;
import com.vormadal.timetracker.rest.filters.AuthenticationFilter;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;

import javax.ws.rs.ApplicationPath;

/**
 * <p>Created: 23-05-2019</p>
 * <p>author: Runi</p>
 */

@ApplicationPath("rest/v1")
public class AppConfig extends ResourceConfig {

    public AppConfig() {
        packages(true, "com/vormadal/timetracker/rest/services",
                "com/vormadal/timetracker/rest/filters",
                "com/vormadal/timetracker/exceptions");
        /* register(MultiPartFeature.class);*/
        /*register(CustomObjectMapper.class);*/
        /*register(ResponseFilter.class);*/
        property(ServerProperties.OUTBOUND_CONTENT_LENGTH_BUFFER, 0);
        register(AuthenticationFilter.class);
        register(new ApplicationBinder());
        register(CustomObjectMapper.class);
        /*Guice.createInjector(new DiConfig());*/
    }
}
