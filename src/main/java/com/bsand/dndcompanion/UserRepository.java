package com.bsand.dndcompanion;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bsand.dndcompanion.character.User;

/**
 * UserRepository interface for accessing user data in the database.
 * 
 * @author Brian Sand
 */

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
