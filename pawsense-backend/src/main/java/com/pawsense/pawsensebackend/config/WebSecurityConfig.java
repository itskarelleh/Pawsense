package com.pawsense.pawsensebackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoders;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //noinspection removal
        http.authorizeHttpRequests(auth ->
                auth.requestMatchers("/api/v1/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/v1/pets/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/v1/events/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/v1/medications/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/pets/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/events/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/medications/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/v1/pets/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/v1/events/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/v1/medications/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/pets/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/events/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/medications/**").authenticated()
        ).oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
//                .csrf().disable();
        return http.build();
    }
}

//    @Value("spring.security.oauth2.resourceserver.jwk-set-uri")
//    private String jwks;

//    @Value("spring.security.oauth2.resourceserver.jwt.issuer-uri")
//    private String issuer;

//    @Bean
//    ReactiveJwtDecoder jwtDecoder() {
//        return ReactiveJwtDecoders.fromIssuerLocation(issuer);
//    }
//    @Bean
//    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
//        http.authorizeExchange(exchanges -> exchanges
//                        .pathMatchers("/api/v1/pets/**").authenticated()
//                )
//                .oauth2ResourceServer(oauth2 -> oauth2
//                        .jwt(jwt ->
//                                jwt.jwkSetUri(jwks)
//                        )
//                );