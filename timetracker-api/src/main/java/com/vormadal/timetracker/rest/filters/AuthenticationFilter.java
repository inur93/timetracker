package com.vormadal.timetracker.rest.filters;

import com.vormadal.permissionmanagement.filters.BaseAuthenticationFilter;
import com.vormadal.timetracker.database.interfaces.IUserDao;
import com.vormadal.timetracker.models.User;
import com.vormadal.timetracker.utils.JwtHandler;
import io.jsonwebtoken.Claims;
import org.bson.types.ObjectId;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.ext.Provider;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * <p>Created: 23-05-2019</p>
 * <p>author: Runi</p>
 */
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter extends BaseAuthenticationFilter<User> {

    private IUserDao users;
    @Inject
    public AuthenticationFilter(IUserDao users){
        this.users = users;
    }
    @Override
    public User resolveUser(ContainerRequestContext requestContext) {
        String bearer = requestContext.getHeaderString("Authorization");
        if(bearer != null && bearer.length() > 7){
            Claims claims;
            try {
                claims = JwtHandler.getInstance().decodeClaims(bearer.substring(7));
            }catch(Exception e){
                return null; //do not throw exception here - it will be handled later
                //throw new WebApplicationException("Could not authenticate user");
            }
            String id = claims.get("id").toString();
            Set<String> roles = new HashSet<>(claims.get("roles", List.class));
            User user =  User.builder()
                    .roles(roles)
                    .build();
            user.setId(new ObjectId(id));
            return user;
        }

        return null;
    }
}
