package com.vormadal.timetracker.utils;

/**
 * <p>Created: 23-05-2019</p>
 * <p>author: Runi</p>
 */

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.*;


@Slf4j
public class JwtHandler {

    private static String defaultKeyBase64 = "5cEtEMIVgZfxTXTEZhuxLDRwUSY3aeEPhNGm6ANrXxwn9MzzxJx5sDWUV0GbYH20Mw4L9fIjNlkWVpRrk8hCEA==";
    private static JwtHandler handler;
    private byte[] secretKey;
    private SignatureAlgorithm alg;

    public static String generateSecret() {
        byte[] keyBytes = MacProvider.generateKey().getEncoded();

        return Base64.getEncoder().encodeToString(keyBytes);
    }

    public JwtHandler(String base64SecretString, SignatureAlgorithm alg) {
        setSecretKey(Base64.getDecoder().decode(base64SecretString));
        this.alg = alg;
    }

    public static JwtHandler getInstance() {
        if (handler == null) {
            handler = new JwtHandler();
        }
        return handler;

    }

    private JwtHandler() {
        this(defaultKeyBase64, SignatureAlgorithm.HS512);
    }

    /**
     * @param id user id
     * @param username subject of claim
     * @param roles user roles
     * @param loginDuration in seconds
     * @return test
     */
    public String createJWT(String id, String username, Set<String> roles, Long loginDuration) {
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("id", id);
        claims.put("roles", roles);
        Date now = new Date();
        Date validity = new Date(now.getTime() + loginDuration);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(alg, getSecretKey())
                .compact();
    }

    public Claims decodeClaims(String jwt) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(jwt)
                .getBody();


    }

    public Set<String> resolveRoles(String token) {
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        return new HashSet<>(claims.getBody().get("roles", List.class));
    }

    public byte[] getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(byte[] secretKey) {
        this.secretKey = secretKey;
    }

}


