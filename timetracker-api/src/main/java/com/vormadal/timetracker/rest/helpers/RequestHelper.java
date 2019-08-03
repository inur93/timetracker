package com.vormadal.timetracker.rest.helpers;

import com.vormadal.timetracker.exceptions.AuthorizationException;
import com.vormadal.timetracker.models.User;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.container.ContainerRequestContext;
import java.security.Principal;

/**
 * <p>Created: 23-05-2019</p>
 * <p>author: Runi</p>
 */

public class RequestHelper {

    public static User getAuthUser(ContainerRequestContext request) throws AuthorizationException {
        Principal userPrincipal = request.getSecurityContext().getUserPrincipal();
        if(userPrincipal == null) throw new AuthorizationException("User was not authenticated");
        try {
            return (User) userPrincipal;
        }catch (Exception e){
            throw new AuthorizationException("User was corrupted");
        }
    }
}
