package com.bsand.dndcompanion;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bsand.dndcompanion.character.CharData;
import com.bsand.dndcompanion.character.User;

/**
 * CharacterRepository interface to handle character-related operations in SQL database.
 * 
 * @author Brian Sand
 */

public interface CharacterRepository extends JpaRepository<CharData, Long> {
    List<CharData> findByUser(User user);
}
