package com.sharkjob.OtherService;

import lombok.NoArgsConstructor;

import java.util.Base64;

@NoArgsConstructor
public class Encoder {
    public final static String base64Encode(String s) {

        String encodeString = Base64.getEncoder().encodeToString(s.getBytes());
        return encodeString;
    }
}
