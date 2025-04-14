package com.bsand.dndcompanion;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(
						authz -> authz.requestMatchers("/api/public/**").permitAll().anyRequest().authenticated())
				.formLogin(form -> form.loginProcessingUrl("/api/login")
						.successHandler((req, res, auth) -> res.setStatus(HttpServletResponse.SC_OK))
						.failureHandler((req, res, ex) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED)))
				.logout(logout -> logout.logoutUrl("/api/logout")
						.logoutSuccessHandler((req, res, auth) -> res.setStatus(HttpServletResponse.SC_OK)));
		return http.build();
	}

	@Bean
	public AuthenticationManager authManager(HttpSecurity http) throws Exception {
		return http.getSharedObject(AuthenticationManagerBuilder.class).ldapAuthentication()
				.userDnPatterns("uid={0},ou=users").groupSearchBase("ou=groups").contextSource()
				.url("ldap://localhost:10389/dc=example,dc=com")
				.and().and().build();
	}

}