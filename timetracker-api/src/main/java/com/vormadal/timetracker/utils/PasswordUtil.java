package com.vormadal.timetracker.utils;

import org.mindrot.jbcrypt.BCrypt;

import java.util.Random;

/**
 * <p>Created: 23-05-2019</p>
 * <p>author: Runi</p>
 */

public class PasswordUtil {
    public static String generatePassword(int length) {
        String password = "";
        Random r = new Random();
        for (int i = 0; i < length; i++) {
            password += (char) ((byte) r.nextInt(26) + 65);
        }
        return password;
    }

    public static String generateSaltedHash(String passWord) {
        return BCrypt.hashpw(passWord, BCrypt.gensalt());
    }

    public static boolean verifyPassword(String password, String hash) {
        if(password == null || hash == null) return false;
        return BCrypt.checkpw(password, hash);
    }
}
