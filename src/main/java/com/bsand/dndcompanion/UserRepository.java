package com.bsand.dndcompanion;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bsand.dndcompanion.character.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
