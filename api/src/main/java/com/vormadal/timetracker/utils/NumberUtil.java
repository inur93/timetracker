package com.vormadal.timetracker.utils;

/**
 * <p>Created: 26-05-2019</p>
 * <p>author: Runi</p>
 */

public class NumberUtil {

    public static Long parseLong(String value){
        try{
            return Long.parseLong(value);
        }catch (NumberFormatException e){
            return null;
        }
    }
}
