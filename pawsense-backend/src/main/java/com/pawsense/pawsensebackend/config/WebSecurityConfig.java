package com.pawsense.pawsensebackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //noinspection removal
        http.authorizeHttpRequests(auth ->
                auth.requestMatchers("/api/v1/pets/**").authenticated()
                .requestMatchers("/api/v1/events/**").authenticated()
                .requestMatchers("/api/v1/medications/**").authenticated()
                .requestMatchers("/api/v1/notes/**").authenticated()
                ).oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        // Configure the converter as needed
        return converter;
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