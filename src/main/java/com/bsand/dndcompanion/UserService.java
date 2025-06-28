package com.bsand.dndcompanion;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.ldap.LdapName;

import org.springframework.ldap.core.DirContextAdapter;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.query.LdapQueryBuilder;
import org.springframework.ldap.support.LdapNameBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bsand.dndcompanion.character.User;

/**
 * UserService class to handle user-related operations in SQL database. As well
 * as with the LDAP server.
 * 
 * @author Brian Sand
 */

@Service
public class UserService {

	private final LdapTemplate ldapTemplate;
	private final UserRepository repo;

	public UserService(UserRepository repo, LdapTemplate ldapTemplate) {
		this.repo = repo;
		this.ldapTemplate = ldapTemplate;
	}

	/*
	 * These methods are for the LDAP server for authentication.
	 */

	// This method checks if a username is already taken in the LDAP server.

	public boolean isUsernameTaken(String username) {
		return !ldapTemplate.search(LdapQueryBuilder.query().where("uid").is(username), new UserNameAttributesMapper())
				.isEmpty();
	}

	/*
	 * This method registers a new user in the LDAP server. Passwords are pre hashed
	 * into SHA-256 before being stored in the LDAP server.
	 */

	public void registerNewUser(String username, String password) throws NoSuchAlgorithmException {

		MessageDigest digest = MessageDigest.getInstance("SHA-256");
		byte[] hash = digest.digest(password.getBytes());
		String hashedPassword = Base64.getEncoder().encodeToString(hash);

		LdapName dn = LdapNameBuilder.newInstance().add("ou", "users").add("uid", username).build();
		DirContextAdapter context = new DirContextAdapter(dn);

		context.setAttributeValues("objectClass",
				new String[] { "top", "person", "organizationalPerson", "inetOrgPerson" });
		context.setAttributeValue("uid", username);
		context.setAttributeValue("userPassword", "{SHA256}" + hashedPassword);
		context.setAttributeValue("sn", "defaultSurname");
		context.setAttributeValue("cn", username);

		ldapTemplate.bind(context);
	}

	/*
	 * This method is used for the SQL database for adding a user when they create
	 * their first character sheet.
	 */

	@Transactional
	public void saveIfNew(String username) {
		repo.findByUsername(username).orElseGet(() -> {
			User newUser = new User();
			newUser.setUsername(username);
			return repo.save(newUser);
		});
	}

	/*
	 * Static inner class to map LDAP attributes to a username.
	 */

	private static class UserNameAttributesMapper implements org.springframework.ldap.core.AttributesMapper<String> {
		@Override
		public String mapFromAttributes(Attributes attrs) throws NamingException {
			return (String) attrs.get("uid").get();
		}
	}
}
