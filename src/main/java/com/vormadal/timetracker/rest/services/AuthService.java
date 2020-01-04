package com.vormadal.timetracker.rest.services;

import com.vormadal.mongodb.exceptions.MorphiaException;
import com.vormadal.timetracker.database.interfaces.IUserDao;
import com.vormadal.timetracker.exceptions.AuthorizationException;
import com.vormadal.timetracker.exceptions.BaseException;
import com.vormadal.timetracker.exceptions.DatabaseException;
import com.vormadal.timetracker.models.*;
import com.vormadal.timetracker.utils.JwtHandler;
import com.vormadal.timetracker.utils.PasswordUtil;
import org.jvnet.hk2.annotations.Service;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.MediaType;

import static com.vormadal.timetracker.rest.helpers.RequestHelper.getAuthUser;
import static com.vormadal.timetracker.utils.PasswordUtil.generateSaltedHash;

/**
 * <p>Created: 15-05-2019</p>
 * <p>author: Runi</p>
 */

@Service
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("/auth")
public class AuthService {


    private ContainerRequestContext request;
    private IUserDao users;

    @Inject
    public AuthService(IUserDao users, ContainerRequestContext request) {
        this.users = users;
        this.request = request;
    }


    @PermitAll
    @Path("/signin")
    @POST
    public UserToken signin(Credentials credentials) throws AuthorizationException {

        User user = users.findByUsername(credentials.getUsername())
                .orElseThrow(() -> new AuthorizationException("invalid username or password"));
        if(user.getFailedLoginAttempts() > 5){
            users.lockUser(user.get_id());
            throw new AuthorizationException("your user account has been locked");
        }
        if (PasswordUtil.verifyPassword(credentials.getPassword(), user.getHash())) {
            user.setToken(JwtHandler.getInstance().createJWT(user.getId(),
                    user.getUsername(),
                    user.getRoles(), 1000 * 60 * 60 * 24L));
            if (user.isDisabled() || user.isLocked()) {
                throw new AuthorizationException("your user account has been locked or disabled");
            }
            users.resetFailedAttempts(user.get_id());
            return new UserToken(user);
        } else {
            users.incrementFailedAttempts(user.get_id());
            throw new AuthorizationException("invalid username or password");
        }


    }

    @PermitAll
    @Path("/register")
    @POST
    public User register(RegisterUser registration) throws Exception {
        if (users.findByUsername(registration.getUsername()).isPresent()) {
            throw new Exception("Username already exists");
        }
        User user = registration.toUser();
        user.setHash(generateSaltedHash(user.getPassword()));
        return users.create(user);
    }

    @RolesAllowed("user")
    @Path("resetpassword")
    @POST
    public User resetPassword(CredentialsUpdate credentials) throws DatabaseException, AuthorizationException {
        User user = getAuthUser(request);
        try {
            User existing = users.get(user.get_id());
            if (PasswordUtil.verifyPassword(credentials.getPassword(), existing.getHash())) {
                users.updatePassword(existing.get_id(), PasswordUtil.generateSaltedHash(credentials.getNewPassword()));
            }
        } catch (MorphiaException e) {
            e.printStackTrace();
        }
        throw new DatabaseException("Could not update password");
    }
}
