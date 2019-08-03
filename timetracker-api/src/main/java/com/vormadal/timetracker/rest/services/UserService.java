package com.vormadal.timetracker.rest.services;

import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.database.UserDao;
import com.vormadal.timetracker.database.interfaces.IUserDao;
import com.vormadal.timetracker.exceptions.AuthorizationException;
import com.vormadal.timetracker.exceptions.DatabaseException;
import com.vormadal.timetracker.models.User;
import com.vormadal.timetracker.models.UserUpdate;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import static com.vormadal.timetracker.rest.helpers.RequestHelper.getAuthUser;

/**
 * <p>Created: 15-05-2019</p>
 * <p>author: Runi</p>
 */
@Path("users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserService{
    private IUserDao users;
    @Context
    private ContainerRequestContext request;
    @Inject
    public UserService(IUserDao users) {
        this.users = users;
    }

    @Path("self")
    @PermitAll
    @GET
    public User getSelf() throws AuthorizationException, DatabaseException {
        User self = getAuthUser(request);
        try {
            return users.get(self.get_id());
        } catch (MorphiaException e) {
            throw new DatabaseException("Could not fetch self");
        }
    }

    @Path("self")
    @PermitAll
    @PUT
    public User updateSelf(UserUpdate user) throws AuthorizationException, DatabaseException {
        User self = getAuthUser(request);
        try {
            return users.update(self.get_id(), user.toUser(), UserUpdate.class);
        } catch (MorphiaException e) {
            throw new DatabaseException("Could not update");
        }
    }
}