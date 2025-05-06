package com.bsand.dndcompanion;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bsand.dndcompanion.character.CharData;
import com.bsand.dndcompanion.character.User;

@Service
public class CharacterService {
	private final CharacterRepository characterRepository;
    private final UserRepository userRepository;
    
    public CharacterService(CharacterRepository characterRepository, UserRepository userRepository) {
        this.characterRepository = characterRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CharData saveCharacter(String username, CharData character) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        character.setUser(user);
        return characterRepository.save(character);
    }

    public List<CharData> getCharactersForUser(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return characterRepository.findByUser(user);
    }
}
