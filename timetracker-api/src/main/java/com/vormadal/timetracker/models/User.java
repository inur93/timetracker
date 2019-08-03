package com.vormadal.timetracker.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vormadal.mongodb.annotations.FieldsClass;
import com.vormadal.mongodb.annotations.PartialClass;
import com.vormadal.mongodb.annotations.PartialClasses;
import com.vormadal.permissionmanagement.models.SecurityUser;
import lombok.*;
import org.bson.types.ObjectId;

import java.util.Set;

/**
 * <p>Created: 15-05-2019</p>
 * <p>author: Runi</p>
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldsClass
@PartialClasses({
        @PartialClass(name = "Credentials", includeFields = {"username", "password"}),
        @PartialClass(name = "CredentialsUpdate", includeFields = {"password", "newPassword"}),
        @PartialClass(name = "UserToken", includeFields = {"username", "token"}),
        @PartialClass(name = "UserUpdate", includeFields = {"firstname", "lastname"})

})
public class User extends BaseModel<ObjectId> implements SecurityUser {

    private String firstname;
    private String lastname;
    private String username;

    private String hash;
    @JsonIgnore
    private transient String password;
    @JsonIgnore
    private transient String newPassword;
    @JsonIgnore
    private transient String token;
    private Set<String> roles;
    private boolean disabled;
    private boolean locked;

    public String getFullname(){
        if(firstname != null && lastname != null){
            return firstname + " " + lastname;
        }
        if(firstname != null){
            return firstname;
        }
        return lastname;
    }

    @Override
    public String getName() {
        return username;
    }
}
