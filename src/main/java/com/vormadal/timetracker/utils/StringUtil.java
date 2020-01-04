package com.vormadal.timetracker.utils;

/**
 * <p>Created: 26-05-2019</p>
 * <p>author: Runi</p>
 */

public class StringUtil {

    public static boolean isNullOrWhitespace(String value){
        return value == null || value.length() == 0 || value.replace(" ", "").length() == 0;
    }
}
