package com.bsand.dndcompanion;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.ldap.authentication.BindAuthenticator;
import org.springframework.security.ldap.authentication.LdapAuthenticationProvider;
import org.springframework.security.ldap.userdetails.DefaultLdapAuthoritiesPopulator;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletResponse;

/*
 * This configuration class authenticates users against an LDAP server.
 * 
 * @author Brian Sand
 */

@EnableWebSecurity
@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(request -> {
			var corsConfig = new org.springframework.web.cors.CorsConfiguration();
			corsConfig.setAllowedOrigins(List.of("http://localhost:3000"));
			corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
			corsConfig.setAllowedHeaders(List.of("*"));
			corsConfig.setAllowCredentials(true);
			return corsConfig;
		})).authorizeHttpRequests(
				authz -> authz.requestMatchers("/api/public/register").permitAll().anyRequest().authenticated())
				.formLogin(form -> form.loginProcessingUrl("/api/login")
						.successHandler((req, res, auth) -> res.setStatus(HttpServletResponse.SC_OK))
						.failureHandler((req, res, ex) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED)))
				.logout(logout -> logout.logoutUrl("/api/logout")
						.logoutSuccessHandler((req, res, auth) -> res.setStatus(HttpServletResponse.SC_OK)));

		return http.build();
	}

	@Bean
	public AuthenticationProvider ldapAuthProvider() {
		BindAuthenticator authenticator = new BindAuthenticator(contextSource());
		authenticator.setUserDnPatterns(new String[] { "uid={0},ou=users" });

		DefaultLdapAuthoritiesPopulator authoritiesPopulator = new DefaultLdapAuthoritiesPopulator(contextSource(),
				"ou=groups");
		authoritiesPopulator.setGroupSearchFilter("(uniqueMember={0})");

		return new LdapAuthenticationProvider(authenticator, authoritiesPopulator);
	}

	@Bean
	public LdapContextSource contextSource() {
		var contextSource = new LdapContextSource();
		contextSource.setUrl("ldap://localhost:10389");
		contextSource.setBase("dc=example,dc=com");
		contextSource.setPooled(false); // optional
		return contextSource;
	}

	@Bean
	public AuthenticationManager authenticationManager(List<AuthenticationProvider> providers) {
		return new ProviderManager(providers);
	}
}