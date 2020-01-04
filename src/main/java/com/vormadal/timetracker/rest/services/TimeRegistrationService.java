package com.vormadal.timetracker.rest.services;

import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.database.TimeRegistrationDao;
import com.vormadal.timetracker.database.interfaces.ITimeRegistrationDao;
import com.vormadal.timetracker.exceptions.AuthorizationException;
import com.vormadal.timetracker.exceptions.DatabaseException;
import com.vormadal.timetracker.models.*;
import org.bson.types.ObjectId;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static com.vormadal.timetracker.rest.helpers.RequestHelper.getAuthUser;
import static com.vormadal.timetracker.utils.NumberUtil.parseLong;
import static com.vormadal.timetracker.utils.StringUtil.isNullOrWhitespace;

/**
 * <p>Created: 12-05-2019</p>
 * <p>author: Runi</p>
 */


@Path("/timeregistrations")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TimeRegistrationService {

    @Context
    private ContainerRequestContext request;
    private ITimeRegistrationDao db;

    @Inject
    public TimeRegistrationService(ITimeRegistrationDao db) {
        this.db = db;
    }

    @RolesAllowed("user")
    @Path("types")
    @GET
    public List<TimeRegistrationType> getTypes(){
        return Arrays.asList(TimeRegistrationType.values());
    }

    @RolesAllowed("user")
    @Path("self")
    @GET
    public List<TimeRegistration> getMyRegistrations(@QueryParam("from") String from,
                                                     @QueryParam("to") String to,
                                                     @QueryParam("query") String query) throws AuthorizationException {

        Long fromValue = null;
        if (!isNullOrWhitespace(from) && (fromValue = parseLong(from)) == null) {
            throw new IllegalArgumentException("Query param 'from' is invalid. Value was: " + from + ". Excepted value of type Long");
        }
        Long toValue = null;
        if (!isNullOrWhitespace(to) && (toValue = parseLong(to)) == null) {
            throw new IllegalArgumentException("Query param 'to' is invalid. Value was: " + to + ". Excepted value of type Long");
        }

        User user = getAuthUser(request);

        return db.getByPeriod(user.getId(),
                fromValue != null ? new Date(fromValue) : null,
                toValue != null ? new Date(toValue) : null,
                isNullOrWhitespace(query) ? null : query);
    }

    @RolesAllowed("user")
    @POST
    public TimeRegistration createTimeRegistration(CreateTimeRegistration newTimeregistration) throws AuthorizationException, DatabaseException {
        TimeRegistration timeRegistration = newTimeregistration.toTimeRegistration();
        User user = getAuthUser(request);

        timeRegistration.setUser(user.getId());
        try {
            return db.create(timeRegistration);
        } catch (MorphiaException e) {
            throw new DatabaseException("Could not create timeregistration");
        }

    }

    @RolesAllowed("user")
    @PUT
    @Path("{tid}")
    public TimeRegistration updateTimeRegistration(@PathParam("tid") String id, UpdateTimeRegistration timeRegistration) throws Exception {
        User user = getAuthUser(request);
        if(timeRegistration.getDate() == null){
            throw new Exception("date should be set");
        }
        try {
            return db.update(new ObjectId(id), user.getId(), timeRegistration.toTimeRegistration());
        } catch (MorphiaException e) {
            throw new DatabaseException("Could not update time registration");
        }
    }

    @RolesAllowed("user")
    @DELETE
    @Path("{tid}")
    public void deleteTimeRegistration(@PathParam("tid") String id) throws AuthorizationException {
        User user = getAuthUser(request);
        db.delete(new ObjectId(id), user.getId());
    }
}
